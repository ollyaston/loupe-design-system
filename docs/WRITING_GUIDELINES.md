# Loupe Writing Guidelines

Language and copy in the Loupe design system follow **Apple's Human Interface Guidelines** for writing. UI text should feel clear, simple, friendly, and helpful.

**Reference:** [Apple HIG – Writing](https://developer.apple.com/design/human-interface-guidelines/writing)

---

## Core principles

### 1. Clarity

- Be direct and unambiguous
- Use familiar words; avoid jargon and technical terms
- One idea per sentence or label

### 2. Simplicity

- Use the fewest words that convey the meaning
- Prefer short words over long ones
- Cut filler and redundancy

### 3. Friendliness

- Conversational, not robotic
- Address the user with "you" and "your" when it helps
- Use a warm but professional tone

### 4. Helpfulness

- Focus on what the user can do, not on system limitations
- Anticipate what users need to know next
- Frame errors and warnings so they guide toward a solution

---

## PACE framework

When writing UI copy, consider:

| Element          | Question to ask                                         |
| ---------------- | ------------------------------------------------------- |
| **Purpose**      | What is the goal of this text?                          |
| **Anticipation** | What does the user need to know before acting?          |
| **Context**      | Where is the user, and what are they trying to do?      |
| **Empathy**      | How might they feel? What would reassure or guide them? |

---

## Practical guidelines

### Sentence case

Use sentence case for all UI text. Capitalize only the first word and proper nouns.

- ✅ "Add new customer"
- ✅ "Select a plan"
- ❌ "Add New Customer"
- ❌ "Select A Plan"

### Button labels

- Use verbs or short verb phrases: "Save", "Cancel", "Add customer"
- Be specific: "Save changes" rather than "OK"
- Primary action first when order matters

### Placeholders

- Describe what to enter or choose
- Keep them short: "Search...", "Select..."
- Use ellipsis (...) when the action leads somewhere

### Empty states

- Be helpful, not punishing
- Suggest next steps when possible
- Use plain language: "No results found." not "Zero items returned."

### Error messages

- Explain what went wrong in plain language
- Suggest how to fix it
- Avoid blame or technical jargon

### Consistency

- Use the same term for the same concept across the app
- Align terminology with platform conventions (e.g., "Settings" not "Preferences" unless that's your standard)
- Match tone: don't mix formal and casual in the same flow

---

## Examples

| Context      | Avoid                              | Prefer                        |
| ------------ | ---------------------------------- | ----------------------------- |
| Empty list   | "No items to display"              | "No results found."           |
| Error        | "Validation failed"                | "Please enter a valid email." |
| Button       | "Submit"                           | "Save changes" or "Send"      |
| Placeholder  | "Enter your email address here"    | "Email" or "you@example.com"  |
| Confirmation | "Are you sure you want to delete?" | "Delete this item?"           |

---

## Usage in Loupe

When writing or auditing copy for Loupe components:

1. **Check sentence case** – ESLint `sentence-case` rule enforces this
2. **Match these guidelines** – Use this doc as the reference for the component consistency audit
3. **Keep defaults aligned** – Placeholder, emptyText, and similar defaults should follow these patterns
4. **Voice and tone** – Loupe is warm and professional; avoid corporate or robotic phrasing
