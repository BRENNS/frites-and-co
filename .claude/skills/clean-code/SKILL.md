# Clean Code Practices

Reference this skill for code quality and organization patterns.

---

## Minimal HTML Elements

Use the **least number of HTML elements** possible:

```tsx
// ❌ WRONG - Unnecessary wrappers
<div className="container">
  <div className="wrapper">
    <div className="content">
      <span>{text}</span>
    </div>
  </div>
</div>

// ✅ CORRECT - Minimal structure
<div className="container">
  {text}
</div>
```

---

## Readable Condition Constants

Extract complex conditions into descriptively named constants:

```tsx
// ❌ WRONG - Inline complex conditions
{(filters.minOrders !== undefined ||
  filters.maxOrders !== undefined ||
  (filters.tags && filters.tags.length > 0)) && <ResetButton />}

// ✅ CORRECT - Named constant
const hasActiveFilters =
  filters.minOrders !== undefined ||
  filters.maxOrders !== undefined ||
  (filters.tags && filters.tags.length > 0);

{hasActiveFilters && <ResetButton />}
```

More examples:
```tsx
const canAddMore = tags.length < MAX_TAGS;
const isInactive = daysSince > 30;
const hasNoShows = customer.totalNoShows > 0;
const isFormValid = !errors.length && isDirty;
```

---

## Spacing Convention

**Never use margin/padding utilities directly.**

```tsx
// ❌ WRONG - Direct spacing
<div className="mt-4 mb-2 ml-3">
<div className="p-4 px-6 py-2">

// ✅ CORRECT - Gap-based spacing
<div className="flex flex-col gap-4">
<div className="flex items-center gap-2">
<div className="space-y-4">
```

| Instead of | Use |
|------------|-----|
| `mt-*`, `mb-*` | `gap-*`, `space-y-*` |
| `ml-*`, `mr-*` | `gap-*`, `space-x-*` |
| `mx-*`, `my-*` | Parent flex/grid with `gap-*` |

---

## Sizing Convention

Use `size-*` for equal dimensions:

```tsx
// ❌ WRONG
<Icon className="h-4 w-4" />
<Avatar className="h-10 w-10" />

// ✅ CORRECT
<Icon className="size-4" />
<Avatar className="size-10" />
```

---

## Always Use cn() for Conditional Classes

```tsx
import { cn } from '@/utils/cn';

// ❌ WRONG - String concatenation
<div className={`base-class ${isActive ? 'active' : ''}`}>

// ✅ CORRECT - cn utility
<div className={cn('base-class', isActive && 'active')}>

// With multiple conditions
<div className={cn(
  'base-class',
  isActive && 'bg-primary',
  isDisabled && 'opacity-50 pointer-events-none',
  className  // Allow override from props
)}>
```

---

## File Organization

### Component File Max ~150 Lines
If a file exceeds 150 lines, extract:
- Complex logic → custom hook in `src/hooks/`
- Helper functions → `src/utils/`
- Constants → `src/constants/`

### Extract Pattern

```tsx
// Before: Large component with mixed concerns
function CustomersTable() {
  // 50 lines of state and handlers
  // 100 lines of JSX
}

// After: Separated concerns
// hooks/use-customers-table.ts
export function useCustomersTable() {
  // State and handlers
  return { ... };
}

// components/organisms/customers-table.tsx
function CustomersTable() {
  const tableState = useCustomersTable();
  // Clean JSX only
}
```

---

## Import Organization

```tsx
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

// 3. Internal - UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. Internal - Custom components
import { CustomerCard } from '@/components/molecules/customer-card';

// 5. Internal - Hooks, utils, types
import { useCustomers } from '@/hooks/use-customers';
import { formatDate } from '@/utils/format';
import type { Customer } from '@/types/customer';
```

---

## Avoid Over-Engineering

### YAGNI (You Aren't Gonna Need It)

```tsx
// ❌ WRONG - Speculative features
interface CustomerCardProps {
  customer: Customer;
  layout?: 'horizontal' | 'vertical' | 'compact' | 'expanded';
  showMetrics?: boolean;
  showActions?: boolean;
  onHover?: () => void;
  animationDuration?: number;
}

// ✅ CORRECT - Only what's needed now
interface CustomerCardProps {
  customer: Customer;
  onEdit: () => void;
  className?: string;
}
```

### DRY - But Don't Abstract Too Early

```tsx
// Wait until you have 3+ similar usages before abstracting
// 2 similar pieces = coincidence
// 3 similar pieces = pattern worth abstracting
```

---

## Error Handling

### Use Early Returns

```tsx
// ❌ WRONG - Nested conditions
function processCustomer(customer: Customer | null) {
  if (customer) {
    if (customer.isActive) {
      // ... deep nesting
    }
  }
}

// ✅ CORRECT - Early returns
function processCustomer(customer: Customer | null) {
  if (!customer) return null;
  if (!customer.isActive) return null;

  // Main logic at root level
}
```

---

## Quick Checklist

- [ ] Minimal HTML elements (no unnecessary wrappers)?
- [ ] Complex conditions extracted to named constants?
- [ ] Using gap/space instead of margin/padding?
- [ ] Using size-* for equal dimensions?
- [ ] Using cn() for conditional classes?
- [ ] File under ~150 lines?
- [ ] Imports organized by category?
- [ ] No speculative/unused features?
