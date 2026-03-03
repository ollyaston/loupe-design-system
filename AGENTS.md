# AGENTS.md

This file provides guidance to AI LLM agents when working with code in this repository.

## Development Commands

**Development server:**

```bash
npm run dev          # Start Next.js dev server with Turbopack
npm run dev:debug    # Start dev server with Node.js inspector
```

**Build and deployment:**

```bash
npm run build        # Build production application (also checks TypeScript compilation)
npm run start        # Start production server
npm run lint         # Run ESLint (note: there may be ESLint config issues)
```

**Component development:**

```bash
npm run storybook         # Start Storybook dev server on port 6006
npm run build-storybook   # Build Storybook for production
```

**Code formatting:**

```bash
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

**IMPORTANT: After making any code changes, ALWAYS run:**

```bash
npm run lint          # Check for lint errors
npm run format        # Format code with Prettier
```

Fix any lint errors before committing. Common issues include:

- Using literal colors (e.g., `bg-red-500`) instead of semantic colors (e.g., `bg-destructive`)
- Using title case instead of sentence case (e.g., "Bank Name" should be "Bank name")
- Missing imports or unused variables

**Testing:**

- Tests run through Storybook with Vitest integration
- Uses Playwright browser testing with Chromium
- Test files are colocated with Storybook stories

## Architecture Overview

This is a **Next.js 15 billing application** for AI agents using the App Router with TypeScript.

### Core Structure

**App routing:**

- `app/(with-layout)/` - Main application pages with shared layout and auth
- `app/(without-layout)/` - Authentication and onboarding flows
- Route groups enable different layout strategies

**Key domain entities:**

- Customers, Orders, Invoices, Payments, Contacts
- Agents (AI products), Tokens, Vendors
- Organizations with multi-tenancy support

### Technology Stack

**Frontend:**

- Next.js 15 with App Router and React 19
- TailwindCSS for layout utilities
- Custom Loupe Design System in `@/design-system/` (see below)

**State & Data:**

- Auth0 for authentication (`@auth0/nextjs-auth0`)
- Axios-based API client (`lib/api-client.ts`)
- React Context for organization state (`context/OrganizationContext.tsx`)
- PostHog analytics integration

**Development:**

- Storybook for component development
- ESLint with Next.js config
- Prettier for code formatting
- Vitest for testing through Storybook

### API Integration

**API Client (`lib/api-client.ts`):**

- Uses Bearer token authentication
- Centralized error handling with `APIError` class
- Functions for CRUD operations on core entities

**Organization Context:**

- Multi-tenant architecture with organization switching
- Persists org selection in localStorage
- Handles currency and billing preferences

### Design System Guidelines

ALWAYS use components from our design system when building frontend UI.

NEVER create a one-off primitive UI component when you can use a component from the design system.

ALWAYS read `stories/Welcome.mdx` and understand the components available before writing new front-end code.

**Text Casing & Copy:**

ALWAYS use Sentence case for all user-facing strings in components (e.g., "Add new customer" not "Add New Customer").

Language and copy follow Apple's Human Interface Guidelines: clarity, simplicity, friendliness, and helpfulness. See `docs/WRITING_GUIDELINES.md` for detailed guidance.

**Tech stack:**

- Components are based on shadcn/ui with custom modifications
- We use Tailwind CSS for styling, including the Tailwind variables in `styles/globals.css`
- We use Radix UI for headless interactivity and accessibility

**Stories:**

All components are documented in Storybook.

- Storybook stories live in `/stories/`
- Each component should have a story for each variant and state
- Browse components in Storybook at `http://paid.design/`

**Adding components:**

If no component exists to support your use case, please create a new component in `@/design-system/`.

If shadcn/ui has a component that is close to what you need, please use it and extend it with your own props. Otherwise, please create new components using Tailwind CSS and Radix UI if needed.

- Add new design system components in `@/design-system/` following shadcn/ui patterns
- Always add a Storybook story for new components in `stories/`
- Use existing Tailwind design tokens from `styles/globals.css`
- Follow existing color system in `styles/semantic-colors.css`
- All components should include the css class `loupe-system` at the root of the component so we can easily identify them for debugging
- Do not use app state in the design system components (e.g. useOrganization, usePathname, useRouter, useSearchParams, useParams, etc.) or make network calls, access browser storage, use feature flags, etc.

There are several custom eslint rules to encourage these patterns in `eslint.config.mjs`

**Component quarantine process:**

New components must go through design review before being added to the main design system:

1. Create the component in `@/design-system/`
2. Create the story in `stories/quarantine/` (NOT in the final category directory)
3. Set the story's `title` field to `"🚧 Quarantine/ComponentName"`
4. Add the quarantine warning and yellow background in the story's parameters:
   ```typescript
   parameters: {
     docs: {
       description: {
         component: "⚠️ **PENDING DESIGN REVIEW** - This component is in quarantine awaiting designer approval before being added to the main design system."
       }
     },
     backgrounds: {
       default: "quarantine",
       values: [
         { name: "quarantine", value: "#fff3cd" },
       ],
     },
   }
   ```
5. Add the component to the quarantine list in `stories/Welcome.mdx`
6. The component can be used in the app, but it's not officially part of the design system yet
7. Once approved by designers, move the story to its final location (e.g., `stories/cards/`, `stories/forms/`, etc.) and update the title (remove the 🚧 emoji)
8. Update `stories/Welcome.mdx` to move the component from quarantine to its proper section

This ensures all new components meet design standards before becoming part of the official Loupe Design System.

### Key Patterns

**Route Organization:**

- Dynamic routes with `[id]` parameters for entity details
- Nested layouts for consistent navigation
- Component co-location with related pages

**Type Safety:**

- TypeScript types in `types/` directory by domain
- Interface definitions for API requests/responses
- Zod for runtime validation

### Important Files

- `middleware.ts` - Next.js middleware for auth/routing
- `lib/constants.ts` - Application constants including API base URL
- `next.config.ts` - Next.js configuration with redirects and webpack setup
