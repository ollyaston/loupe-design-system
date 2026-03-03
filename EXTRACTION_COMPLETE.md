# Loupe design system extraction – complete

Extraction from the Paid/Onyx billing app to a standalone Loupe design system is **complete**.

---

## Validation checklist ✓

| Check                                                                             | Status                  |
| --------------------------------------------------------------------------------- | ----------------------- |
| `npm run build-storybook`                                                         | ✓ Passes                |
| `npm run lint`                                                                    | ✓ 0 errors (9 warnings) |
| `npm run format`                                                                  | ✓ Passes                |
| No `process.env` for Auth0, PostHog, LaunchDarkly, Stripe, Intercom, PAID_API_KEY | ✓ None found            |
| No `paid.ai`, `api.paid`, `auth.paid` in source                                   | ✓ None found            |

---

## What was done

### Phases 1–4 (previously completed)

- Removed `app/`, most of `lib/`, `context/`, `hooks/`, `types/` (kept `types/events.ts`)
- Rebranded Onyx → Loupe (`loupe-system` class, docs)
- Slimmed `public/`, ESLint config, GitHub workflows
- Stubbed `feature-flags`, `ui-flags`; no-op hooks for ghost-completion, realtime-transcription

### Phase 5 – Dependencies removed

- **Auth & integrations:** `@auth0/nextjs-auth0`, `@intercom/messenger-js-sdk`, `@useparagon/connect`
- **Paid/Billing:** `@paid-ai/paid-blocks`, `@paid-ai/paid-node`, `@stripe/react-stripe-js`, `@stripe/stripe-js`
- **Analytics & feature flags:** `launchdarkly-react-client-sdk`, `posthog-js`
- **Maps:** `mapbox-gl`, `react-map-gl`
- **Data fetching:** `@tanstack/react-query`
- **PDF & export:** `@react-pdf/renderer`, `react-pdf`, `jspdf`, `html2canvas`, `html2pdf.js`, `jszip`
- **Other:** `@knocklabs/react`, `axios`
- **Dev:** `@types/jsonwebtoken`
- **Overrides:** removed `jspdf` override

### Types & test

- **types/:** Kept `events.ts` only (used by `signal-processing-milestone`)
- **test/:** Kept `setup.ts` (Vitest setup for Storybook tests)
- Removed eslint ignore for non-existent `types/tax.ts`

---

## Commands

```bash
npm install
npm run storybook          # Dev server on :6006
npm run build-storybook    # Production build
npm run lint
npm run format
```

---

## Optional next steps

- Fix 9 lint warnings (`large-text-classes` – use Heading component)
- Run `npm audit` and address vulnerabilities
- Consider removing `@testing-library/jest-dom` matchers if Vitest runs only Storybook tests
