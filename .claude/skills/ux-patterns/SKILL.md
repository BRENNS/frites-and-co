# UX Patterns & Rules Reference

Apply these UX patterns when building UI components. Reference this skill with `/project:ux-patterns`.

---

## Dropdown & Select Components

### Show Options Upfront (2-5 options)
Display all choices visibly rather than in a dropdown:
- **Radio buttons**: Simple choices, compact space, form contexts
- **Selectable cards**: Options with descriptions, visual emphasis
- **Segmented control**: Binary/ternary choices, toolbar UI
- **Dropdown**: Only for 6+ options or space-constrained layouts

### Searchable Combobox (10+ options)
Standard dropdowns become painful at **10-15 options** and unusable at **30+ options**.

**Use searchable combobox for:**
- Large lists (countries, currencies, timezones, **tags**)
- Users who know what they're seeking
- Options with similar prefixes
- Data-driven or growing lists

**Implementation tips:**
- Preserve selected value display
- Clear search filter when dropdown closes
- Display "No results found" messaging
- Show recently used or popular options first
- **Set max-height with scroll** for long lists

---

## Search & Filtering

### Auto-Focus on Modal with Single Input
Auto-focus the search/input field when modal opens.

### Inline Feedback over Toasts
Feedback should appear where users are looking, not in distant corners.

---

## Form & Input Patterns

### Keep Submit Buttons Enabled
Display inline error messages instead of disabling buttons.

### Auto-Format Inputs
For structured data (phone, credit card), auto-format as users type.
Use `inputmode="numeric"` instead of `type="number"`.

### Example Placeholders
Show expected format (e.g., `4242 4242 4242 4242`) instead of repeating labels.

---

## Loading States

### Skeleton Loading
Use animated placeholder shapes instead of spinners:
- Match skeleton shapes to actual content
- Show 3-5 skeleton items
- Use subtle pulse/shimmer animation
- Minimum 300ms visible to prevent flash

### Disable Submit During Loading
Prevent duplicate submissions with loading indicator.

### Progressive Loading Messages (>2-3s)
Show evolving status messages for long operations.

---

## Modal Behavior

### Multiple Exit Methods
Modals should provide:
- X button
- Click outside (overlay)
- Escape key

**Exception**: Critical confirmations (delete, destructive actions).

---

## Navigation & Scrolling

### Scroll to Top Button
Show floating button after 300-500px scroll on long pages.

### Floating Action Button (FAB)
One FAB per screen maximum, bottom-right position.

---

## Key Accessibility Principles

- Use ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-label`)
- Ensure keyboard navigation for all interactive elements
- Maintain sufficient color contrast (WCAG AA)
- Test with assistive technology

---

## Quick Reference Table

| # Options | Best Pattern |
|-----------|-------------|
| 2-3 | Radio buttons, Segmented control |
| 4-5 | Radio buttons, Selectable cards |
| 6-9 | Simple dropdown |
| 10-15 | Searchable dropdown |
| 15+ | Searchable combobox with max-height + scroll |
| 30+ | Searchable combobox + categorization/grouping |
