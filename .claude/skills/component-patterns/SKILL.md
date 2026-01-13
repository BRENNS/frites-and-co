# Component Architecture Patterns

Reference this skill when creating or modifying React components.

---

## Atomic Design Structure

```
src/components/
├── atoms/       # Basic UI elements (buttons, badges, inputs)
├── molecules/   # Composite components (cards, form fields)
├── organisms/   # Complex components (forms, tables, lists)
├── layouts/     # Layout composition (sidebar, page layouts)
└── ui/          # shadcn/ui primitives
```

---

## Core Rules

### 1. One Component Per File
**NEVER** define multiple components in the same file.

```tsx
// ❌ WRONG
export function CustomerCard() { ... }
export function CustomerCardSkeleton() { ... }

// ✅ CORRECT - Separate files
// customer-card.tsx
export function CustomerCard() { ... }

// customer-card-skeleton.tsx
export function CustomerCardSkeleton() { ... }
```

### 2. Search Before Creating
Before creating a new component, search existing ones:

```bash
ls src/components/atoms src/components/molecules src/components/organisms
```

Use `Glob` or `Grep` to find similar components.

### 3. Generic Over Specific
Design components for reuse across the application:

```tsx
// ❌ WRONG - Too specific
function CustomerStatusBadge({ customer }: { customer: Customer }) {
  return <Badge>{customer.status}</Badge>;
}

// ✅ CORRECT - Generic and reusable
function StatusBadge({
  status,
  variant
}: {
  status: string;
  variant: BadgeVariant;
}) {
  return <Badge variant={variant}>{status}</Badge>;
}
```

### 4. Extend Don't Duplicate
If an existing component is close to what you need:

```tsx
// ❌ WRONG - Creating near-duplicate
function UserCardSmall() { ... }  // Similar to UserCard

// ✅ CORRECT - Add size prop to existing
function UserCard({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  ...
}
```

---

## Props Design

### Required Over Optional
Props should be required by default:

```tsx
// ❌ WRONG - Unnecessary optional props
interface CustomerCardProps {
  customer?: Customer;  // Required to render!
  onEdit?: () => void;  // Always provided
}

// ✅ CORRECT
interface CustomerCardProps {
  customer: Customer;
  onEdit: () => void;
  className?: string;  // Only className is optional
}
```

### Avoid Overkill Props
Never add props for values that can be defined inside:

```tsx
// ❌ WRONG - Overkill props
interface TagInputProps {
  placeholder?: string;      // Use t() inside
  emptyMessage?: string;     // Use t() inside
  maxTags?: number;          // Define as const
}

// ✅ CORRECT
interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}
```

### Use Discriminated Unions
For variant-based components:

```tsx
interface BaseProps {
  tag: string;
  className?: string;
}

interface DisplayProps extends BaseProps {
  variant?: 'display';
}

interface RemovableProps extends BaseProps {
  variant: 'removable';
  onRemove: () => void;
}

type TagBadgeProps = DisplayProps | RemovableProps;
```

---

## Naming Conventions

### Pattern: `[Entity][Variant][Type]`

| Type | Examples |
|------|----------|
| Card | `CustomerCard`, `ProductCard` |
| Badge | `StatusBadge`, `TagBadge` |
| Dialog | `ConfirmDialog`, `EditProductDialog` |
| Sheet | `CustomerSheet`, `FilterSheet` |
| Form | `LoginForm`, `ProductForm` |
| Table | `CustomersTable`, `ReservationsTable` |
| List | `TagList`, `NotificationList` |
| Button | `SubmitButton`, `ExportButton` |

---

## Composition Patterns

### Accept children and className
```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      {children}
    </div>
  );
}
```

### Use Slot Pattern for Flexibility
```tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;  // Slot for action buttons
}
```

---

## Extract Reusable Logic

| What | Where | Example |
|------|-------|---------|
| Functions | `src/utils/` | `formatDate()`, `formatPrice()` |
| Constants | `src/constants/` | `STATUS_VARIANTS`, `RATING_OPTIONS` |
| Hooks | `src/hooks/` | `useCustomers()`, `useDebounce()` |
| Schemas | `src/schemas/` | `loginSchema`, `productSchema` |
| Types | `src/types/` | `Customer`, `Reservation` |

---

## Quick Checklist

Before creating a component:
- [ ] Searched for existing similar components?
- [ ] Using atomic design placement? (atoms/molecules/organisms)
- [ ] One component per file?
- [ ] Generic enough for reuse?
- [ ] Props are mostly required (not optional)?
- [ ] Using translations with `t()` inside, not as props?
- [ ] Following naming convention?
- [ ] Accepting `className` prop?
