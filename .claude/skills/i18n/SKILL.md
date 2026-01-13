---
name: i18n
description: Internationalization and locale management. Use when modifying translation files, adding new translation keys, or working with any locale JSON files (en.json, fr.json, ru.json, cn.json) in public/locales/.
---

# i18n Translation Management

Add, update, or manage translations across all 4 locale files simultaneously.

## Critical Rule

**ALWAYS update ALL 4 locale files together. Never leave any locale out of sync.**

---

## Locale Files

- `public/locales/en.json` - English
- `public/locales/fr.json` - French (primary)
- `public/locales/ru.json` - Russian
- `public/locales/cn.json` - Chinese

---

## Instructions

When the user provides translation requests, follow these steps:

### 1. Parse the Request

Extract:
- **Key path**: Dot-notation path (e.g., `customers.filters.min-orders`)
- **Translations**: Values for each locale (en, fr, ru, cn)

### 2. Validate Key Format

- Use **kebab-case** for all keys: `user-profile`, `min-orders`, `no-results`
- Nested paths use dots: `customers.filters.min-orders`
- Never use camelCase or snake_case

### 3. Update All 4 Locale Files

**CRITICAL**: Always update ALL 4 files simultaneously. Never leave translations out of sync.

For each locale file:
1. Read the current JSON content
2. Navigate to the correct nested path
3. Add or update the translation value
4. Write the updated JSON (preserve formatting with 2-space indent)

### 4. Provide Confirmation

Show the user what was added/updated:

```
Added translations for `customers.filters.min-orders`:
- en: "Minimum orders"
- fr: "Commandes minimum"
- ru: "Минимум заказов"
- cn: "最少订单"
```

---

## Examples

### Add a single translation

User: `/project:i18n customers.filters.reset-filters`

Response: Ask for translations, then add:
```json
// en.json
"customers": {
  "filters": {
    "reset-filters": "Reset filters"
  }
}

// fr.json
"customers": {
  "filters": {
    "reset-filters": "Réinitialiser les filtres"
  }
}

// ru.json
"customers": {
  "filters": {
    "reset-filters": "Сбросить фильтры"
  }
}

// cn.json
"customers": {
  "filters": {
    "reset-filters": "重置筛选"
  }
}
```

### Add multiple translations at once

User: `/project:i18n` with a list:
```
customers.table.name = Name | Nom | Имя | 姓名
customers.table.email = Email | E-mail | Эл. почта | 电子邮件
customers.table.phone = Phone | Téléphone | Телефон | 电话
```

### Add with context

User: `/project:i18n customers.metrics.total-spent "Total amount spent by customer"`

The context helps generate accurate translations for all languages.

---

## Section Organization

Follow existing patterns for key organization:

| Section | Purpose | Example |
|---------|---------|---------|
| `validation` | Form validation errors | `validation.email-invalid` |
| `common` | Shared UI elements | `common.save`, `common.cancel` |
| `pages` | Page titles/descriptions | `pages.customers.title` |
| `forms` | Form labels/placeholders | `forms.customer.name-label` |
| `messages` | Success/error/info | `messages.save-success` |
| `buttons` | Button labels | `buttons.submit` |
| `dialogs` | Dialog content | `dialogs.confirm-delete.title` |
| `tables` | Table headers/content | `tables.customers.columns.name` |
| `filters` | Filter labels | `filters.date-range` |
| `statuses` | Status labels | `statuses.reservation.confirmed` |

---

## Translation Guidelines

### French (fr) - Primary Language
- Formal "vous" form for user-facing text
- Proper accents: é, è, ê, à, ù, ç, etc.

### English (en)
- Use American English spelling
- Sentence case for UI labels

### Russian (ru)
- Formal "вы" form
- Proper Cyrillic characters

### Chinese (cn)
- Simplified Chinese characters
- Concise phrasing preferred

---

## Workflow Automation

When user says just the key without translations:

1. **Infer from key name**: Generate appropriate translations
2. **Ask for confirmation** before applying
3. **Apply to all 4 files** simultaneously

Example:
```
User: /project:i18n customers.no-results

Claude: I'll add translations for `customers.no-results`:
- en: "No customers found"
- fr: "Aucun client trouvé"
- ru: "Клиенты не найдены"
- cn: "未找到客户"

Should I add these translations?
```
