# API & Data Fetching Patterns

Reference this skill when working with APIs and data fetching.

---

## Architecture Overview

```
src/
├── app/api/          # Next.js API route handlers
├── hooks/            # React Query hooks for data fetching
├── utils/http-client.ts  # Axios HTTP client
├── types/            # TypeScript interfaces
└── schemas/          # Zod validation schemas
```

---

## Custom Hook Pattern

All data fetching uses `@tanstack/react-query` with custom hooks:

```tsx
// hooks/use-customers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/utils/http-client';
import type { Customer } from '@/types/customer';

export function useCustomers(params?: CustomerQueryParams) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => httpClient.get<Customer[]>('/api/customers', { params }),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => httpClient.get<Customer>(`/api/customers/${id}`),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerDto) =>
      httpClient.post<Customer>('/api/customers', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
```

---

## Query Key Conventions

```tsx
// Entity lists
['customers']
['customers', { status: 'active', page: 1 }]  // With filters

// Single entity
['customers', customerId]

// Nested resources
['customers', customerId, 'orders']
['customers', customerId, 'orders', orderId]

// Special queries
['customers', 'count']
['customers', 'stats']
```

---

## API Route Handlers

Located in `src/app/api/`:

```tsx
// app/api/customers/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  // Fetch data from external API or database
  const customers = await fetchCustomers({ page: Number(page) });

  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate with Zod
  const result = customerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 }
    );
  }

  const customer = await createCustomer(result.data);
  return NextResponse.json(customer, { status: 201 });
}
```

---

## HTTP Client Usage

```tsx
import { httpClient } from '@/utils/http-client';

// GET request
const customers = await httpClient.get<Customer[]>('/api/customers');

// GET with query params
const filtered = await httpClient.get<Customer[]>('/api/customers', {
  params: { status: 'active', limit: 10 }
});

// POST request
const newCustomer = await httpClient.post<Customer>('/api/customers', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT request
const updated = await httpClient.put<Customer>(`/api/customers/${id}`, data);

// DELETE request
await httpClient.delete(`/api/customers/${id}`);
```

---

## Type Definitions

```tsx
// types/customer.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone?: string;
}

export interface CustomerQueryParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive';
  search?: string;
}
```

---

## Validation Schemas

```tsx
// schemas/customer.ts
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, 'validation.name-min-2'),
  email: z.string().email('validation.email-invalid'),
  phone: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
```

---

## Loading & Error States

```tsx
function CustomersPage() {
  const { data: customers, isLoading, error } = useCustomers();

  if (isLoading) {
    return <CustomersTableSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <CustomersTable customers={customers} />;
}
```

---

## Optimistic Updates

```tsx
export function useToggleCustomerStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      httpClient.patch(`/api/customers/${id}/toggle-status`),

    // Optimistic update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['customers'] });

      const previous = queryClient.getQueryData(['customers']);

      queryClient.setQueryData(['customers'], (old: Customer[]) =>
        old.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
      );

      return { previous };
    },

    // Rollback on error
    onError: (err, id, context) => {
      queryClient.setQueryData(['customers'], context?.previous);
    },

    // Refetch after success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
```

---

## Pagination Pattern

```tsx
export function useCustomersPaginated(params: PaginationParams) {
  return useQuery({
    queryKey: ['customers', 'paginated', params],
    queryFn: () => httpClient.get<PaginatedResponse<Customer>>(
      '/api/customers',
      { params }
    ),
    placeholderData: keepPreviousData,  // Smooth pagination
  });
}

interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
```

---

## Quick Checklist

- [ ] Using custom hooks for all data fetching?
- [ ] Query keys follow convention?
- [ ] Types defined in `src/types/`?
- [ ] Validation schemas in `src/schemas/`?
- [ ] Loading states handled with skeletons?
- [ ] Error states properly displayed?
- [ ] Mutations invalidate relevant queries?
