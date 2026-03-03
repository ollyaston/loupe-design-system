# Design system extraction audit

Full audit of what to keep vs remove to strip application code and retain only the **Loupe design system**.

---

## Current status

**Component consistency** (copy, language, patterns) has been audited and fixed separately. See `docs/COMPONENT_CONSISTENCY_AUDIT.md` and `docs/WRITING_GUIDELINES.md`. That work is complete.

**This document** covers extraction and structure: removing app code, trimming dependencies, rebranding. Execute in phases per Part 7 when ready.

---

## Executive summary

The project is a Next.js 15 billing app with a design system embedded in `design-system/` and `stories/`. To keep only the design system and rebrand as Loupe:

1. **Remove**: All of `app/`, most of `lib/`, `context/`, most of `types/`, most of `hooks/` (except design-system–related ones), middleware, API/auth, CI/CD for app deployment, and all API keys / third-party service integrations
2. **Keep**: `design-system/`, `stories/`, `components/` (slimmed), Storybook config, styles, Tailwind/PostCSS, dev tooling, Puppeteer, AG Grid, Chromatic, D3, Highcharts, Recharts – all design-system tooling
3. **Fix**: Design system components that import app-specific code; ensure a **clean build** with no third-party API keys or service credentials

---

## Part 1: What to remove

### 1.1 Directories (delete entirely)

| Directory                                 | Reason                                                                                                                       |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `app/`                                    | All Next.js routes: auth, onboarding, invoices, payments, customers, agents, signals, blocks, etc.                           |
| `context/` except ThemeContext            | OrganizationContext, LaunchDarklyProvider, IntercomProvider, FunnelContext, AuditDetailsContext                              |
| `hooks/` except `use-toast`, `use-mobile` | use-ghost-completion, use-realtime-transcription, use-products, use-customer-research-cache, etc.                            |
| `types/`                                  | App domain types (customer, invoice, order, product, etc.) – except `types/events` if you keep `signal-processing-milestone` |

### 1.1b Components folder – KEEP (slimmed)

The design system and stories depend on `components/`. Keep the folder but **remove app-specific components** and retain only:

| Keep                                        | Used by                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `components/layouts/container.tsx`          | ~60+ stories as decorator/wrapper                                                           |
| `components/layouts/sidebar-layout.tsx`     | Layout stories, SkeletonPage story (needs `useFeatureFlags` fix – see 3.1)                  |
| `components/layouts/full-layout.tsx`        | FullLayout stories                                                                          |
| `components/layouts/account-layout.tsx`     | AccountLayout stories                                                                       |
| `components/layouts/chat-layout.tsx`        | ChatLayout stories                                                                          |
| `components/layouts/takeover-layout.tsx`    | TakeoverLayout stories                                                                      |
| `components/kpi.tsx`                        | design-system/skeleton-page, KPI/KpiRow stories                                             |
| `components/skeleton-table.tsx`             | design-system/skeleton-page (DataTableSkeleton)                                             |
| `components/table-empty-state.tsx`          | TableEmptyState stories                                                                     |
| `components/currency-input.tsx`             | design-system/currency-input (CurrencyCode type – could instead import from `lib/currency`) |
| `components/providers/ag-grid-provider.tsx` | AG Grid module registration for Storybook; optional license key from env                    |

**Remove** from components: pricing/_, sidebar-content, agents/_, signals*, events/*, dialogs/_ (app-specific), team-switcher, org-_, stripe-connect, audit/\*, and all other app-specific pieces.

**Note:** `sidebar-layout` and `full-layout` use `useFeatureFlags` from `@/app/feature-flags`. When `app/` is removed, you must either: (a) add a minimal `app/feature-flags.ts` stub that exports safe defaults, or (b) refactor these layouts to make feature flags optional/injectable. Same for any other layout that imports from app.

### 1.2 Files to remove (root / config)

| File                                                      | Reason                                                                       |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `middleware.ts`                                           | Auth0 + routing for app                                                      |
| `next.config.ts`                                          | App redirects, webpack overrides – replace with minimal config for Storybook |
| `amplify.yml`                                             | App deployment                                                               |
| `test-pricing-route.js`, `scripts/test-pricing-filter.js` | App-specific                                                                 |

**`.env.example`** – Replace entirely with a clean design-system-only template (see Part 9).

### 1.3 Lib files to remove

Keep only: `lib/utils.ts` (cn + minimal helpers), `lib/currency.ts`, `lib/countries.ts`, `lib/theme-utils.ts`.

Remove all others:

- `api-client.ts`, `api-access-token-cache.ts`, `constants.ts`
- `auth-utils.ts`, `brandfetch-client.ts`, product API client
- `customer-utils.ts`, `research-utils.ts`, `order-utils.tsx`, `product-utils.ts`
- `pricing-utils.ts`, `pricing-display-utils.ts`, `pricing-override-utils.ts`
- `posthog.ts`, `posthog-opt-out.ts`
- `template-storage.ts`, `template-html-generator.ts`
- `error-utils.tsx`, `snapshot-diff-utils.ts`, `string-utils.ts`
- `quote-utils.ts`, `audit-utils.ts`, `signal-utils.ts`, `time-utils.ts`, `date-utils.ts`
- `credit-benefits-pricing.ts`, `credit-benefits-storage.ts`
- `customer-research-utils.ts`, `funnel-utils.ts`, `org-switch-utils.ts`
- `shim-parse-number-string.ts`, `temp-id-stripping.ts`, `order-amendments-utils.ts`

### 1.4 Package.json dependencies – KEEP vs REMOVE

**KEEP** (design system tooling – no API keys required):

- `puppeteer` – Storybook/Playwright browser testing
- `ag-grid-community`, `ag-grid-react`, `ag-grid-enterprise` – tables; user supplies own license key or runs with watermark
- `@chromatic-com/storybook` – visual regression; optional, user supplies own project token for Chromatic cloud
- `@highcharts/react`, `highcharts` – charts
- `recharts` – charts
- `d3`, `d3-sankey` – if used in design system charts
- `playwright` – browser tests
- `@tanstack/react-table` – used by data-table

**REMOVE** (require API keys, third-party services, or app backends):

- `@auth0/nextjs-auth0`
- `@intercom/messenger-js-sdk`, `@knocklabs/react`
- Billing packages (Stripe blocks, billing API)
- `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `@tanstack/react-query`
- `@useparagon/connect`
- `launchdarkly-react-client-sdk`
- `posthog-js`
- `mapbox-gl`, `react-map-gl`
- `@react-pdf/renderer`, `jspdf`, `html2pdf.js`, `html2canvas`, `jszip`
- `ai`, `ai-v4`, `@ai-sdk/openai`, `@ai-sdk/react` (if trimming AI components)
- `streamdown`

### 1.5 GitHub workflows – design-system only

**Keep** (Storybook / design-system CI):

| Workflow               | Purpose                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `lint.yml`             | ESLint on PR/push                                                                                                                        |
| `format.yml`           | Prettier check on PR/push                                                                                                                |
| `build_storybook.yml`  | Storybook build on PR (validates design-system builds)                                                                                   |
| `deploy_storybook.yml` | Deploy Storybook to GitHub Pages (optional). Align steps with `build_storybook.yml` (e.g. native binary workaround) if builds fail in CI |

**Remove**:

| Workflow     | Reason                                                                                                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build.yml`  | Next.js app build – no app                                                                                                                                                                                             |
| `test.yml`   | Vitest runs app/component tests – most will be gone; design-system has few unit tests (e.g. format-number). Remove, or replace with a slim test job that only runs `design-system/__tests__/` and Storybook test addon |
| `claude.yml` | Claude Code GitHub Action – requires `ANTHROPIC_API_KEY` secret. Remove unless you want AI PR assistance (and can add your own key to ENV.md)                                                                          |

**Result:** `.github/workflows/` should contain only `lint.yml`, `format.yml`, `build_storybook.yml`, and optionally `deploy_storybook.yml`.

### 1.6 Public assets – slim for design system

Storybook uses `staticDirs: ["../public"]`. Slim `public/`:

| Remove                                                                                             | Reason                                               |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `terms.html`, `privacy.html`                                                                       | App legal pages                                      |
| Product logo SVGs in `illustrations/`                                                            | Design system Logo is self-contained                 |
| `connect_stripe.svg`, `slack.svg`, `datadog.svg`, `salesforce.svg`, `clickhouse.svg`, `sql-db.svg` | App integration assets                               |
| `ai_sparkles.svg`, `arrow_up_right_transparent.svg`                                                | App-specific if not used in stories                  |

**Keep** (if referenced by design-system or stories): `next.svg`, `illustrations/waving_hand.svg`, or any generic asset actually imported. Audit with grep before deleting.

### 1.7 Components providers to keep

| Component                                   | Purpose                                                                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `components/providers/ag-grid-provider.tsx` | Registers AG Grid Community + Enterprise modules. Use in StorybookLayout (app/layout is gone). License key optional – user supplies own for production |

### 1.8 Developer tooling to KEEP

All agent rules, AI assistants, linting, and code-quality tooling stay as part of the design system:

| Item                 | Location                                  | Purpose                                                                                                                                                                                                                                                                                           |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agent rules**      | `.cursor/rules/design-system.md`          | Cursor rules for design system usage and component creation. Stories use `Container` from `@/components/layouts/container` – keep this                                                                                                                                                            |
| **Claude rules**     | `.claude/design-system.md`                | Claude guidance for design system patterns (mirrors .cursor rules)                                                                                                                                                                                                                                |
| **Agent docs**       | `AGENTS.md`, `CLAUDE.md`                  | Architecture and dev commands for AI agents                                                                                                                                                                                                                                                       |
| **Greptile**         | `greptile.json`                           | AI code review rules (design system usage, loupe-system class, no app state in components). Update: (1) rebrand to Loupe in `customContext.other`; (2) remove or adjust rules scoped to `app/**` (app/ is gone); keep `components/**` scope for remaining layout/KPI/skeleton components          |
| **ESLint**           | `eslint.config.mjs`, `eslint-rules/*.mjs` | All rules: `loupe-system-class`, `no-app-state-in-design-system`, `ui-component-story-required`, `sentence-case`, `literal-color-classes`, `large-text-classes`. `loupe-system-class`. Keep `page-wrapper-required` (becomes no-op once `app/` is gone) or remove it |
| **Prettier**         | `package.json` scripts, `.prettierignore` | Formatting                                                                                                                                                                                                                                                                                        |
| **Husky**            | `.husky/pre-push`                         | Runs `format:check` before push                                                                                                                                                                                                                                                                   |
| **GitHub workflows** | `.github/workflows/`                      | Lint, format, build_storybook, (optional) deploy_storybook. See Part 1.5                                                                                                                                                                                                                          |

These ensure the design system stays consistent and AI/LLM tooling continues to enforce patterns.

### 1.9 Other config and files – checklist

| Item                                       | Action                                                                                                                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`                           | Keep minimal config for Storybook (Next.js runtime for `next/font`, `next/image`, `next/link`). Remove app redirects, webpack overrides for Highcharts only if still needed |
| `vitest.config.ts`                         | Keep if design-system unit tests remain (e.g. `design-system/__tests__/format-number.test.ts`)                                                                              |
| `tailwind.config.ts`, `postcss.config.mjs` | Keep                                                                                                                                                                        |
| `package.json` `name`                      | Change from `ap-frontend` to `loupe-design-system` (or your package name)                                                                                                   |
| `.prettierignore`, `.eslintignore`         | Keep; remove app-specific paths                                                                                                                                             |
| `test/setup.ts`                            | Keep only if Vitest tests stay; remove if test.yml is gone                                                                                                                  |

---

## Part 2: Design system dependencies (what it needs)

### 2.1 Lib files to keep (possibly inlined or moved)

| File                 | Used by                                                  |
| -------------------- | -------------------------------------------------------- |
| `lib/utils.ts`       | Nearly all design-system components (`cn`) – keep        |
| `lib/currency.ts`    | `currency-input.tsx`, `currency-input-with-selector.tsx` |
| `lib/countries.ts`   | `address-input.tsx`                                      |
| `lib/theme-utils.ts` | `highchart.tsx`, `ThemeContext`                          |

Consider moving these under `design-system/lib/` or `design-system/utils/` so the design system is self-contained.

### 2.2 Context to keep

| File                       | Used by                                |
| -------------------------- | -------------------------------------- |
| `context/ThemeContext.tsx` | StorybookLayout, design system theming |

### 2.3 Hooks to keep or move

| Hook                  | Used by       |
| --------------------- | ------------- |
| `hooks/use-toast.ts`  | `toaster.tsx` |
| `hooks/use-mobile.ts` | `sidebar.tsx` |

### 2.4 Types to keep

| Type                            | Used by                           |
| ------------------------------- | --------------------------------- |
| `types/events.ts` (FailureType) | `signal-processing-milestone.tsx` |

Consider moving `FailureType` into the design system if you keep that component.

---

## Part 3: Design system components with app dependencies

These components break the design-system boundary and need changes.

### 3.1 App imports that must be removed or replaced

| Component                               | Problem imports                                                                                         | Fix                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `sidebar.tsx`                           | `useFeatureFlags` from `@/app/feature-flags`, `HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED` from `@/app/ui-flags` | Make feature flags optional or inject via props/context; move UI flags into design-system config |
| `page-wrapper.tsx`                      | `useFeatureFlags` from `@/app/feature-flags`                                                            | Same as above                                                                                    |
| `components/layouts/sidebar-layout.tsx` | `useFeatureFlags` from `@/app/feature-flags`                                                            | Same – needs feature-flag fix to work without app/                                               |
| `input-form.tsx`                        | `useRealtimeTranscription`, `useGhostCompletion` from hooks                                             | Extract or mock in Storybook; or make these optional/pluggable                                   |
| `shadcn-io/ai/reasoning.tsx`            | `ToolChoiceWebSearchPreview` from `@/app/(with-layout)/agents/_lib/agent-config`                        | Move agent config types into design-system or make component generic                             |
| `signal-processing-milestone.tsx`       | `FailureType` from `@/types/events`                                                                     | Move `FailureType` into design-system types                                                      |
| `skeleton-page.tsx`                     | `DataTableSkeleton` from `@/components/skeleton-table`, `KPI` from `@/components/kpi`                   | Keep – we retain these in `components/`. No change needed                                        |

### 3.2 Branding to replace with Loupe

Replace all product-specific branding with Loupe. Files to update:

| File                                    | Update                                             |
| --------------------------------------- | -------------------------------------------------- |
| `stories/Welcome.mdx`                   | Title, platform description, contact info → Loupe  |
| `design-system/usage-table-preview.tsx` | Usage table label → generic or "Loupe usage table" |
| `design-system/grid-ai-input.tsx`       | AI query labels → Loupe equivalents                |
| `design-system/icon.tsx`                | Comment about custom icons → Loupe                 |
| `.storybook/main.ts`                    | Deployment URL comment → Loupe domain              |

Also: CSS class `loupe-system` across all components. ESLint rule `loupe-system-class`.

### 3.3 Gem component

`gem.tsx` defines entity types (agents, credits, invoices, etc.) that map to billing product areas. Options:

1. Keep as-is and treat as a generic entity/icon system
2. Generalize labels/IDs so they’re not billing-specific
3. Move to quarantine if too product-specific

---

## Part 4: ESLint and linting (KEEP all)

Keep the full ESLint setup and all custom rules:

| Rule                                                   | Action                                                               |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| `loupe-system-class` | Keep – design system components must have root class                 |
| `no-app-state-in-design-system`                        | Keep – design-system boundary enforcement                            |
| `ui-component-story-required`                          | Keep – every component needs a Storybook story                       |
| `sentence-case`                                        | Keep – user-facing strings                                           |
| `literal-color-classes`                                | Keep – semantic colors only                                          |
| `large-text-classes`                                   | Keep                                                                 |
| `page-wrapper-required`                                | Keep (becomes no-op – no `app/` pages to lint) or remove for clarity |

The `page-wrapper-required` rule only applies to `app/**/page.tsx`; with `app/` removed, it matches nothing. You can leave it (harmless) or remove it to avoid confusion.

---

## Part 5: Styles to keep

| File                         | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `styles/globals.css`         | Tailwind, design tokens            |
| `styles/semantic-colors.css` | Color system                       |
| `styles/color-ramps.css`     | Color ramps                        |
| `styles/ag-grid.css`         | If AgGrid is used in design system |
| `styles/knock.css`           | Remove if Knock is app-only        |

---

## Part 6: Suggested new structure (design-system-only repo)

```
loupe-design-system/
├── design-system/           # Components (unchanged structure)
├── components/              # Slimmed: container, layouts, kpi, skeleton-table, table-empty-state, currency-input, providers/ag-grid-provider
├── stories/                 # Storybook stories
├── .storybook/              # Storybook config
├── styles/                  # globals.css, semantic-colors.css, color-ramps.css
├── lib/                     # utils, currency, countries, theme-utils only
├── context/                 # ThemeContext only
├── hooks/                   # use-toast, use-mobile only
├── types/                   # design-system types only (events.FailureType if needed)
├── eslint-rules/            # Custom ESLint rules (keep all)
├── .cursor/rules/           # Cursor agent rules (design-system.md)
├── .claude/                 # Claude agent rules (design-system.md)
├── .husky/                  # Git hooks (pre-push → format:check)
├── .github/workflows/       # lint.yml, format.yml, build_storybook.yml
├── package.json             # Trimmed deps, keep lint/format/type-check scripts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs        # Keep all rules
├── greptile.json            # AI code review (update branding on extract)
├── ENV.md                   # API keys / env vars reference (see Part 9.8)
├── AGENTS.md                # Agent guidance and dev commands
├── CLAUDE.md                # Points to AGENTS.md
└── README.md                # Design system docs; link to ENV.md for setup
```

---

## Part 7: Execution order

1. **Phase 1 – Fix design-system imports**
   - Refactor `sidebar`, `page-wrapper`, `input-form`, `reasoning`, `skeleton-page`, `signal-processing-milestone` to remove app dependencies
   - Decide whether to keep, generalize, or remove highly app-specific components (UsageTablePreview, GridAIInput, Gem, SkeletonPage)

2. **Phase 2 – Copy and slim project**
   - Create new repo or branch
   - Delete `app/` (but see below: may need minimal `app/feature-flags.ts` stub for layouts), most of `lib/`, `context/` (except ThemeContext), most of `hooks/`, most of `types/`
   - Slim `components/`: keep only container, layouts (sidebar, full, account, chat, takeover), kpi, skeleton-table, table-empty-state, currency-input
   - Remove or quarantine stories that use removed components: `UsageBasedPricingForm.stories.tsx` (uses pricing/agent-pricing)
   - Trim `package.json`, remove middleware, `next.config` app redirects
   - **Replace `.env.example`** with clean template (Part 9.1): optional AG Grid and Chromatic vars only
   - **Create `ENV.md`** – API keys reference (Part 9.8) so contributors know which keys to add and where to get them

3. **Phase 3 – Rebrand to Loupe**
   - Replace all product/platform branding with Loupe
   - Update README, Welcome.mdx, Storybook title to Loupe
- CSS class `loupe-system` in all design-system components
  - ESLint: `eslint-rules/loupe-system-class.mjs`, update `eslint.config.mjs` imports
   - ESLint: update `sentence-case.mjs` allowed exceptions (remove product-specific terms)

4. **Phase 4 – Update developer tooling and GitHub**
   - `greptile.json`: Rebrand to Loupe in `customContext.other`
   - `.cursor/rules/design-system.md`: Loupe design system
   - `.claude/design-system.md`: Loupe design system
   - `.github/workflows/`: Remove `build.yml`, `test.yml`, `claude.yml`. Keep only `lint.yml`, `format.yml`, `build_storybook.yml`, and optionally `deploy_storybook.yml`

5. **Phase 5 – Validate clean build**
   - `npm install` (no missing peers for removed packages)
   - `npm run storybook` (runs without env vars, or with optional AG Grid key only)
   - `npm run build-storybook`
   - `npm run lint`
   - `npm run format`
   - `npm run format:check` (via husky pre-push)
- Grep for product domain URLs – zero matches
  - No `process.env` reads for Auth0, PostHog, LaunchDarkly, Stripe, Intercom, product API keys, Brandfetch

---

## Part 8: High-risk components (review before keeping)

| Component                          | Risk                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `skeleton-page.tsx`                | Depends on `DataTableSkeleton` and `KPI` – OK, both kept in components/   |
| `usage-table-preview.tsx`          | Product-specific usage table branding                                     |
| `grid-ai-input.tsx`                | Product-specific AI query branding, app AI hooks                          |
| `input-form.tsx`                   | Real-time transcription, ghost completion – app AI                        |
| `shadcn-io/ai/reasoning.tsx`       | Agent config from app                                                     |
| `gem.tsx`                          | Entity IDs aligned with billing product (agents, credits, invoices, etc.) |
| `billing-frequency-selector.tsx`   | Billing concepts                                                          |
| `customer-picker.tsx`              | Customer domain                                                           |
| `currency-input-with-selector.tsx` | Fine for design system if currency/countries stay                         |
| `address-input.tsx`                | Fine with `lib/countries`                                                 |

Recommendation: Move clearly product-specific components (UsageTablePreview, GridAIInput, BillingFrequencySelector, CustomerPicker) to quarantine or remove. Generalize Gem and SkeletonPage if you want to keep them.

---

## Part 9: Clean build – no API keys, no third-party services

The extracted design system must feel like a **fresh repo** with no third-party credentials or service ties.

### 9.1 Environment variables – clean slate

**Replace `.env.example`** with a design-system-only template. Remove all app/product vars:

| Remove                           | Reason              |
| -------------------------------- | ------------------- |
| `AUTH0_*`                        | Auth removed        |
| `NEXT_PUBLIC_POSTHOG_*`          | PostHog removed     |
| `NEXT_PUBLIC_API_BASE`           | No app API          |
| `INTERCOM_SECRET_KEY`            | Intercom removed    |
| Product API keys                 | Removed             |
| `NEXT_PUBLIC_BRANDFETCH_API_KEY` | Brandfetch removed  |

**Optional vars only** (user supplies their own if needed). See **Part 9.8** for the full API keys reference and `ENV.md` template.

```
# Optional – AG Grid Enterprise license (omit for community/watermark)
NEXT_PUBLIC_AG_GRID_LICENSE_KEY=

# Optional – Chromatic project token (only if using Chromatic cloud)
CHROMATIC_PROJECT_TOKEN=
```

### 9.2 Lib files to remove (API keys, third-party services)

Ensure these are gone – they pull credentials or call external APIs:

- `lib/api-client.ts` – `API_BASE`, Bearer tokens
- `lib/api-access-token-cache.ts` – JWT, PostHog
- `lib/auth-utils.ts` – Auth0 config
- `lib/posthog.ts`, `lib/posthog-opt-out.ts` – PostHog key
- `lib/brandfetch-client.ts` – Brandfetch API key
- Product API client – product API keys
- `lib/constants.ts` – `API_BASE` from env

### 9.3 No hardcoded product URLs

Search and remove/replace any hardcoded product or app URLs.

### 9.4 AG Grid

- Design system uses `ag-grid-enterprise` (SparklinesModule, MasterDetailModule).
- Without a license key, AG Grid shows a dev watermark but runs.
- User provides `NEXT_PUBLIC_AG_GRID_LICENSE_KEY` for production; design system stays agnostic.

### 9.5 Chromatic

- `@chromatic-com/storybook` addon can stay; it works without a token for local Storybook.
- For Chromatic cloud, user sets `CHROMATIC_PROJECT_TOKEN` in CI.
- Do not commit any Chromatic project token or product project IDs.

### 9.6 Git hygiene

- `.gitignore`: ensure `.env`, `.env.local`, `.env.*.local` are ignored.
- Never commit real API keys; `.env.example` should have placeholders only.

### 9.7 Validation

After extraction, confirm:

1. `npm install` succeeds with no missing peer deps for removed packages.
2. `npm run storybook` runs with no env vars (or only optional AG Grid key).
3. `npm run build-storybook` completes.
4. No `process.env` reads for Auth0, PostHog, LaunchDarkly, Stripe, Intercom, product API keys, Brandfetch.
5. Grep for product domain URLs – should return no matches.

### 9.8 API keys and environment variables reference

Create and maintain this as a **single source of truth** (e.g. `ENV.md` or a "Setup" section in README) so anyone cloning the repo knows exactly which keys to add.

| Variable                          | Required? | Used by                                           | Without it                                       | Where to get                                                                                                           |
| --------------------------------- | --------- | ------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_AG_GRID_LICENSE_KEY` | No        | AG Grid Enterprise (DataTable, AgGrid components) | Dev watermark on grids; full functionality works | [ag-grid.com](https://www.ag-grid.com/javascript-data-grid/licensing/) – free for non-production, trial for production |
| `CHROMATIC_PROJECT_TOKEN`         | No        | Chromatic addon (visual regression in CI)         | Local Storybook works; CI visual diff disabled   | [chromatic.com](https://www.chromatic.com) – create project, copy token from dashboard                                 |
| `ANTHROPIC_API_KEY`               | No        | `claude.yml` GitHub Action (AI PR assistance)     | Remove `claude.yml` or workflow is skipped       | GitHub repo Secrets; [anthropic.com](https://www.anthropic.com) – only if keeping claude.yml                           |

**None required for local development.** The design system runs `npm run storybook` and `npm run build-storybook` with no env vars.

**Suggested `.env.example`** (commit this; document in ENV.md):

```bash
# Optional – only if using AG Grid Enterprise without watermark
# Get from https://www.ag-grid.com/javascript-data-grid/licensing/
# NEXT_PUBLIC_AG_GRID_LICENSE_KEY=

# Optional – only for Chromatic visual regression in CI
# Get from https://www.chromatic.com (project settings)
# CHROMATIC_PROJECT_TOKEN=
```

**Suggested `ENV.md`** (or README ## Setup):

```markdown
## Environment variables

No API keys are required for local development. Storybook and build work out of the box.

| Variable                        | Purpose                                    | Required | Get key                                    |
| ------------------------------- | ------------------------------------------ | -------- | ------------------------------------------ |
| NEXT_PUBLIC_AG_GRID_LICENSE_KEY | Removes AG Grid watermark; production use  | No       | ag-grid.com                                |
| CHROMATIC_PROJECT_TOKEN         | Chromatic visual regression in CI          | No       | chromatic.com                              |
| ANTHROPIC_API_KEY               | Claude Code GitHub Action (GitHub Secrets) | No       | anthropic.com – only if keeping claude.yml |
```

---

_Audit generated to support extracting the Loupe design system from the application codebase._
