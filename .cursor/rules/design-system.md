---
description: Instructions for using the Loupe design system.
globs:
alwaysApply: true
---

# Design System Enforcement Rules

## MANDATORY: Always Use Existing Design System Components

**BEFORE creating any UI element, you MUST:**

1. **Check `design-system/` directory** for existing components
2. **Search through existing components** to see if functionality already exists
3. **Use existing components** even if they need small modifications via props or composition
4. **Never create inline JSX** for common UI patterns (buttons, inputs, cards, etc.)

### Available Design System Components

Always check and use these existing components from `@/design-system`:

**Core Primitives:**

- `Button` - all button interactions (primary, secondary, destructive, outline, ghost, link)
- `Input` - text inputs, search, etc.
- `Textarea` - multi-line text inputs
- `Select` - dropdowns and selection
- `Checkbox`, `RadioGroup` - form controls
- `Switch`, `Toggle`, `ToggleGroup` - toggle controls
- `Label` - form labels
- `Badge` - status indicators, tags
- `Avatar` - user profile images
- `Icon` - all iconography (use `Icon` component, never raw SVGs)

**Layout & Containers:**

- `Card` - content containers
- `Sheet` - slide-out panels
- `Dialog` - modals and overlays
- `Popover`, `HoverCard` - floating content
- `Accordion`, `Collapsible` - expandable content
- `Tabs` - tabbed interfaces
- `Separator` - dividers
- `ScrollArea` - scrollable containers

**Navigation:**

- `Breadcrumb` - navigation paths
- `Pagination` - page navigation
- `Sidebar` - main navigation
- `Command` - command palette/search

**Feedback & Status:**

- `Alert`, `AlertDialog` - notifications and confirmations
- `Toast` - temporary notifications
- `Progress` - loading progress
- `Spinner` - loading states
- `Skeleton` - loading placeholders

**Data Display:**

- `Table`, `DataTable` - data tables
- `Chart`, `Highchart` - data visualization
- `Calendar` - date selection

## MANDATORY: Creating New Design System Components

**IF a component doesn't exist, you MUST:**

### 1. Create the Component in Design System

- **Location**: `design-system/[component-name].tsx`
- **Naming**: Use kebab-case for files, PascalCase for components
- **Structure**: Follow existing patterns from `design-system/button.tsx`

### 2. Required Component Structure

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Use CVA for variants (when applicable)
const componentVariants = cva(
  "[base-classes]",
  {
    variants: {
      variant: {
        default: "[default-styles]",
        // other variants
      },
      size: {
        default: "[default-size]",
        // other sizes
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // component-specific props
}

  // ALWAYS include 'loupe-system' class
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn("loupe-system", componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component, componentVariants };
```

### 3. Required Tech Stack

- **Styling**: Tailwind CSS with CSS variables from `styles/globals.css`
- **Accessibility**: Use Radix UI primitives when available
- **Variants**: Use `class-variance-authority` (CVA) for component variants
- **Base**: Check if shadcn/ui has a similar component to extend
- **Utils**: Use `cn()` utility for className merging

### 4. MANDATORY: Create Storybook Story

**Location**: `stories/[category]/[ComponentName].stories.tsx`

**Required story structure:**

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Component } from "@/design-system/component";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Component> = {
  title: "[Category]/Component", // e.g., "Primitives/NewComponent"
  component: Component,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Component>;

// REQUIRED: Default story
export const Default: Story = {
  args: {
    // default props
  },
};

// REQUIRED: Show all variants
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Component variant="default">Default</Component>
      <Component variant="secondary">Secondary</Component>
      {/* Show all variants */}
    </div>
  ),
};
```

**Story Categories:**

- `Primitives/` - Basic UI components (buttons, inputs, etc.)
- `Forms/` - Form-related components
- `Charts/` - Data visualization
- `Tables/` - Data tables
- `Loading/` - Loading states
- `Layouts/` - Layout components
- `Custom/` - Business-specific components

## Writing & Copy

UI text follows **Apple's Human Interface Guidelines**: clarity, simplicity, friendliness, helpfulness.

- Use **sentence case** (e.g., "Add new customer" not "Add New Customer")
- Keep labels and placeholders concise
- See `docs/WRITING_GUIDELINES.md` for full guidance

## ENFORCEMENT CHECKLIST

Before creating ANY UI component, you MUST:

- [ ] ✅ **Search existing components** in `design-system/`
- [ ] ✅ **Check if shadcn/ui has this component**
- [ ] ✅ **Try composing existing components first**
- [ ] ✅ **If creating new component, add to `design-system/`**
- [ ] ✅ **Use CVA for variants and `loupe-system` class**
- [ ] ✅ **Create comprehensive Storybook story**
- [ ] ✅ **Test in both light and dark themes**
- [ ] ✅ **Ensure accessibility with Radix UI when needed**

## NEVER DO:

❌ Create inline UI components in page/feature files  
❌ Use raw HTML elements for common UI patterns  
❌ Skip creating Storybook stories for new components  
❌ Forget the `loupe-system` class on design system components  
❌ Create components outside of `design-system/`  
❌ Use hardcoded colors instead of CSS variables  
❌ Skip accessibility considerations

## Examples of CORRECT Usage:

✅ **Good**: `<Button variant="outline" size="sm">Save</Button>`  
❌ **Bad**: `<button className="border px-3 py-1 rounded">Save</button>`

✅ **Good**: `<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>`  
❌ **Bad**: `<div className="border rounded-lg p-4"><h3>Title</h3></div>`

✅ **Good**: Create `design-system/status-chip.tsx` with Storybook story  
❌ **Bad**: Create status component in feature directory without story

Remember: **Every UI element should either use an existing design system component or extend the design system properly.**
