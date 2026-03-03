# Component Consistency Audit

Audit of Loupe design system components for copy, language, code patterns, and alignment. Reference: `docs/WRITING_GUIDELINES.md` (Apple HIG style).

---

## 1. Copy & Language

### 1.1 Empty state messages

| Component              | Current               | Standard (Apple HIG)     | Fix                           |
| ---------------------- | --------------------- | ------------------------ | ----------------------------- |
| SearchableSelect       | "No results found."   | ✓ Good                   | —                             |
| Combobox               | "No option found."    | Use "results" for search | → "No results found."         |
| MultiSelectCombobox    | "No option found."    | Same as above            | → "No results found."         |
| CustomerPicker         | "No customer found."  | Domain-specific OK       | Keep (or "No results found.") |
| DataTable              | "No results"          | Add period               | → "No results."               |
| AddressInput (country) | "No countries found." | ✓ Good                   | —                             |

**Recommendation:** Use "No results found." for searchable/filterable lists. Use "No [thing] found." when the thing is specific (customers, countries). Use "No results." for tables. Add period to all.

### 1.2 Placeholder consistency

| Component                          | Current                | Issue                         |
| ---------------------------------- | ---------------------- | ----------------------------- |
| Select, SearchableSelect, Combobox | "Select..."            | ✓ Consistent                  |
| MultiSelectCombobox                | "Select options..."    | ✓ OK (plural)                 |
| CustomerPicker                     | "Select a customer..." | ✓ OK (specific)               |
| SelectWithCustomOption             | "Select option"        | Missing ellipsis              |
| TimePicker                         | "Select time"          | Missing ellipsis              |
| DatePicker                         | "Pick a date"          | "Pick" vs "Select"            |
| DateRangePicker                    | "Pick a date range"    | Same                          |
| DateRangePickerWithShortcuts       | "Select end date"      | Mixed verbs                   |
| BillingFrequencySelector           | "Choose frequency"     | "Choose" vs "Select"          |
| AddressInput (country)             | "Select country"       | Missing ellipsis              |
| GridAIInput                        | "Search, query, find…" | Em dash (…) vs ellipsis (...) |

**Recommendation:** Use "Select..." for single-select dropdowns. Use "Select [thing]..." when specific. Standardize date/time to "Select date", "Select time", "Select date range". Use "..." (three dots) not "…" (ellipsis character). Align "Choose" vs "Select" – prefer "Select" for consistency.

### 1.3 Search placeholders

| Component                                       | Current               | Standard |
| ----------------------------------------------- | --------------------- | -------- |
| SearchableSelect, Combobox, MultiSelectCombobox | "Search..."           | ✓ Good   |
| CustomerPicker                                  | "Search customers..." | ✓ OK     |
| DataTable                                       | "Search..."           | ✓ Good   |
| AddressInput                                    | "Search countries..." | ✓ Good   |

### 1.4 Other copy

| Component       | Current                                        | Issue                                   |
| --------------- | ---------------------------------------------- | --------------------------------------- |
| InputForm       | "Ask anything..."                              | Casual; consider "Type your message..." |
| AICard          | "Describe your request in natural language..." | Long; consider shorter                  |
| FormModal       | submitLabel "Save", cancelLabel "Cancel"       | ✓ Good                                  |
| CustomerPicker  | addNewLabel "Add new customer"                 | ✓ Good                                  |
| CloseX          | aria-label "Close"                             | ✓ Good                                  |
| DataTable empty | "No results"                                   | Add period                              |

### 1.5 Ellipsis usage

- **SearchableSelect, Combobox:** "Search..." ✓
- **GridAIInput:** "Search, query, find…" – uses Unicode ellipsis (U+2026). Prefer ASCII "..." for consistency.

---

## 2. Code Patterns

### 2.1 Form control height

| Component                    | Height                | Aligned?       |
| ---------------------------- | --------------------- | -------------- |
| Input                        | h-9                   | ✓              |
| Select trigger               | h-9                   | ✓              |
| Combobox trigger             | h-9                   | ✓              |
| SearchableSelect trigger     | h-9 or min-h-9 h-auto | ✓              |
| MultiSelectCombobox trigger  | min-h-9 h-auto        | ✓              |
| Button (default)             | h-9                   | ✓              |
| CommandInput (in dropdowns)  | h-9                   | ✓              |
| TimeIncrementSelector        | h-9                   | ✓              |
| Toggle                       | h-9                   | ✓              |
| AddressInput country trigger | h-10                  | ✗ Inconsistent |

**Fix:** AddressInput country dropdown trigger uses `h-10`. Change to `h-9` for form control consistency.

### 2.2 Form control padding

| Component                                       | Padding   | Aligned?                         |
| ----------------------------------------------- | --------- | -------------------------------- |
| Select trigger                                  | px-3 py-2 | ✓                                |
| SearchableSelect, Combobox, MultiSelectCombobox | px-3 py-2 | ✓                                |
| Input                                           | px-3 py-1 | ✓ (different – single-line text) |
| Textarea                                        | px-3 py-2 | ✓                                |
| Button (default)                                | px-4 py-2 | Different for buttons (OK)       |

### 2.3 Dropdown/combobox alignment (recently fixed)

- Trigger: px-3 py-2, ring-offset-background, text-left, placeholder text-muted-foreground ✓
- Check icon: absolute position, pr-8 on CommandItem ✓
- Font weight: regular on options ✓

### 2.4 Focus/error states

- Select, SearchableSelect, Combobox, MultiSelectCombobox: border-destructive, focus-visible:ring-destructive ✓
- Ring offset: ring-offset-background focus-visible:ring-offset-1 ✓

---

## 3. Props & API

### 3.1 Change handler naming

| Pattern        | Components                                                                                                                                           | Consistent?          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| onValueChange  | Select, Combobox, SearchableSelect, CustomerPicker, Tabs, BillingFrequencySelector                                                                   | ✓                    |
| onValuesChange | MultiSelectCombobox                                                                                                                                  | ✓ (plural for multi) |
| onChange       | SelectWithCustomOption, CurrencyInput, TimeIncrementSelector, InputForm, AICard, AddressInput, Search, ColorPicker, BorderControl, SandpackCodeBlock | Mixed                |

**Recommendation:** Use `onValueChange` for single-value select-like components. Use `onChange` for raw input components (Input, Textarea) and components that pass native events or different value shapes. SelectWithCustomOption uses `onChange(value, customValue?)` – consider `onValueChange` for consistency with Select, but signature differs.

### 3.2 Placeholder prop naming

- All use `placeholder` ✓
- SearchableSelect/Combobox also have `searchPlaceholder`, `emptyText` ✓

### 3.3 Default values

Placeholder defaults vary – see Section 1.2 for standardization.

---

## 4. Visual Alignment

### 4.1 Shadow

- Select, Combobox, SearchableSelect, MultiSelectCombobox, Button (outline): shadow-input ✓

### 4.2 Ring offset

- Form triggers: ring-offset-background focus-visible:ring-offset-1 ✓

---

## 5. Priority Fixes

### High priority (copy – user-facing)

1. **Empty states:** Unify to "No results found." for Combobox, MultiSelectCombobox. Change DataTable "No results" → "No results."
2. **Placeholders:** Add ellipsis to SelectWithCustomOption ("Select option" → "Select..."), TimePicker ("Select time" → "Select time..."), AddressInput country ("Select country" → "Select country...").
3. **Date/time:** Standardize Pick → Select: "Pick a date" → "Select date", "Pick a date range" → "Select date range".
4. **BillingFrequencySelector:** "Choose frequency" → "Select frequency...".

### Medium priority (code)

5. **AddressInput:** Country trigger h-10 → h-9.
6. **GridAIInput:** "Search, query, find…" → "Search..." or "Ask a question..." (and use "..." not "…").

### Low priority (polish)

7. **InputForm, AICard:** Review placeholder length per Apple HIG (concise).
8. **SelectWithCustomOption:** Consider `onValueChange` if API can be unified.

---

## 6. Implementation Order

1. Section 5 items 1–4 (copy – empty states, placeholders, date/time, frequency).
2. Section 5 items 5–6 (code – AddressInput height, GridAIInput placeholder).
3. Section 5 items 7–8 (polish).

---

## 7. Audit coverage

**In scope:** Copy/language, code patterns (heights, padding, focus states), props/API naming, empty states, placeholders, form controls, dropdowns, date/time pickers.

**Resolved (previously out of scope):**

- **Components in `components/`** – KPI uses eslint-disable for `text-2xl` (Heading not suitable for numeric display). Layout components remain in `components/` as app-level structure.
- **Story content** – ChatMessage/Message example code updated to use `text-lg` to satisfy large-text-classes rule.
- **InputForm** – Placeholder shortened: "Ask anything..." → "Type a message..." (Apple HIG: concise).
- **AICard** – Placeholder shortened: "Describe your request in natural language..." → "Describe your request...".
- **SelectWithCustomOption** – `onChange` renamed to `onValueChange` for consistency with Select, Combobox, SearchableSelect.
- **CustomerPicker** – emptyText "No customer found." → "No results found." for consistency with other searchable lists.
- **Form.stories** – Placeholders and emptyText aligned with defaults: "Select a role" → "Select role...", "Select a country" → "Select country...", Combobox/MultiSelect emptyText → "No results found.", DropdownComponentsComparison uses consistent defaults.

**Completed:** All audit items addressed. Lint issues resolved.

---

## 8. Reference

- **Writing:** `docs/WRITING_GUIDELINES.md`
- **Apple HIG Writing:** https://developer.apple.com/design/human-interface-guidelines/writing
- **Extraction/structure:** `DESIGN_SYSTEM_AUDIT.md`
