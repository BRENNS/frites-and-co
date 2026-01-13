# Clean Code Pattern Analyzer

Analyze the codebase for common anti-patterns and suggest improvements based on the project's CLAUDE.md guidelines.

## Patterns to Detect

### 1. Inline Complex Conditions (should be named constants)
Search for complex conditions in JSX that should be extracted:
```
grep -E "\{[^}]*(\|\||&&).*(\|\||&&).*\}" --include="*.tsx"
```

**Bad Pattern:**
```tsx
{(filters.minOrders !== undefined || filters.maxOrders !== undefined || (filters.tags && filters.tags.length > 0)) && <Button />}
```

**Good Pattern:**
```tsx
const hasActiveFilters = filters.minOrders !== undefined || filters.maxOrders !== undefined || (filters.tags && filters.tags.length > 0);
{hasActiveFilters && <Button />}
```

### 2. Duplicated Condition Logic
Look for the same condition appearing multiple times in a file:
```
grep -E "\.length\s*[><=]+" --include="*.tsx" | sort | uniq -c | sort -rn
```

**Bad Pattern:**
```tsx
const canAddMore = tags.length < MAX_TAGS;
// ... later in same file
{tags.length >= MAX_TAGS && <Message />}
```

**Good Pattern:**
```tsx
const canAddMore = tags.length < MAX_TAGS;
{!canAddMore && <Message />}
```

### 3. Magic Numbers in Conditions
Search for numeric literals in conditions:
```
grep -E "\.(length|count|size)\s*[><=]+\s*\d+" --include="*.tsx"
```

**Bad Pattern:**
```tsx
{items.length > 5 && <ShowMore />}
```

**Good Pattern:**
```tsx
const MAX_VISIBLE_ITEMS = 5;
const hasMoreItems = items.length > MAX_VISIBLE_ITEMS;
{hasMoreItems && <ShowMore />}
```

### 4. Negated Boolean Props
Search for double negatives or unclear boolean logic:
```
grep -E "!\s*!" --include="*.tsx"
grep -E "isNot|isNo|hasNo" --include="*.tsx"
```

### 5. Repeated Translation Patterns
Search for translation functions that should use constant keys:
```
grep -E "t\(['\`].*\$\{" --include="*.tsx"
```

### 6. Prop Drilling Indicators
Search for props passed through 3+ levels:
```
# Look for components receiving many props
grep -E "^\s*\w+:\s*\w+," --include="*.tsx" | wc -l
```

## Execution

When running this skill:

1. **Scan for patterns** - Run grep searches for each anti-pattern
2. **Group by file** - Organize findings by file location
3. **Prioritize by severity**:
   - 🔴 Critical: Security issues, data loss risks
   - 🟡 Important: Maintainability, readability
   - 🟢 Nice-to-have: Style, minor optimizations
4. **Suggest fixes** - Provide concrete refactoring examples
5. **Reference CLAUDE.md** - Link findings to project guidelines

## Output Format

```markdown
## Clean Code Analysis Report

### File: src/components/atoms/tag-input.tsx

| Line | Pattern | Severity | Issue | Fix |
|------|---------|----------|-------|-----|
| 133 | Duplicated condition | 🟡 | `tags.length >= MAX_TAGS` duplicates `canAddMore` logic | Use `!canAddMore` |

### Summary
- 🔴 Critical: 0
- 🟡 Important: 1
- 🟢 Nice-to-have: 0
```

## Arguments

- `--file <path>` - Analyze specific file
- `--severity <level>` - Filter by minimum severity (critical, important, nice-to-have)
- `--fix` - Attempt to auto-fix simple patterns
