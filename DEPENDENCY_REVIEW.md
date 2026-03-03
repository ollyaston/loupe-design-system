# Package.json dependency review

Review of dependencies for the Loupe design system. Based on grep of `design-system/`, `components/`, `stories/`, `lib/`, `hooks/`, `context/`.

---

## Safe to remove (not imported in our source)

| Package                         | Notes                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| `@auth0/nextjs-auth0`           | Auth – app only                                                                    |
| `@intercom/messenger-js-sdk`    | Intercom – app only                                                                |
| Billing blocks package          | Not imported. **Caveat:** brings in Stripe as dep; removing it also removes Stripe |
| Billing API package             | Not imported                                                                       |
| `@stripe/react-stripe-js`       | Not imported directly (came via billing blocks)                                    |
| `@stripe/stripe-js`             | Not imported directly                                                              |
| `@tanstack/react-query`         | Not imported – app data fetching                                                   |
| `@useparagon/connect`           | Paragon – app integrations                                                         |
| `launchdarkly-react-client-sdk` | Not imported – we use stub `lib/feature-flags.ts`                                  |
| `posthog-js`                    | Not imported – analytics removed                                                   |
| `mapbox-gl`                     | Not imported directly                                                              |
| `react-map-gl`                  | Not imported directly                                                              |

---

## Must keep (used by design system)

| Package                                                          | Used by                                                               |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| `streamdown`                                                     | `design-system/shadcn-io/ai/response.tsx` – Streamdown component      |
| `ai`, `ai-v4`, `@ai-sdk/openai`, `@ai-sdk/react`                 | AI components (Response, Message, Conversation, InputForm, Reasoning) |
| `@tanstack/react-table`                                          | `design-system/data-table.tsx`                                        |
| `ag-grid-*`, `ag-charts-*`                                       | AG Grid tables and charts                                             |
| `@radix-ui/*`                                                    | Core UI primitives                                                    |
| `@codesandbox/sandpack-react`                                    | SandpackCodeBlock                                                     |
| `shiki`                                                          | Code highlighting                                                     |
| `highcharts`, `@highcharts/react`, `recharts`, `d3`, `d3-sankey` | Charts                                                                |
| `react-hook-form`, `@hookform/resolvers`, `zod`                  | Forms                                                                 |
| `@tiptap/*`                                                      | Rich text (if used)                                                   |
| `react-pdf`                                                      | PDF viewer (if used in stories)                                       |
| `embla-carousel-react`                                           | Carousel                                                              |

---

## Needs verification

| Package                                        | Possible use                                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `@knocklabs/react`                             | Not directly imported – may be transitive from another dep. `npm ls` shows it's top-level only |
| `@react-pdf/renderer`                          | Used by `react-pdf` or invoice/PDF generation?                                                 |
| `html2canvas`, `html2pdf.js`, `jspdf`, `jszip` | PDF/export utilities – check if any component uses                                             |
| `axios`                                        | Used by `@knocklabs/client` (transitive). Not in our source                                    |
| `puppeteer`                                    | Storybook/Vitest browser tests – keep for testing                                              |

---

## Suggested removal list

**Phase 1 – clearly unused (run build-storybook after each batch):**

1. `@auth0/nextjs-auth0`
2. `@intercom/messenger-js-sdk`
3. Billing API package
4. `@useparagon/connect`
5. `launchdarkly-react-client-sdk`
6. `posthog-js`
7. `mapbox-gl`
8. `react-map-gl`
9. `@tanstack/react-query`

**Phase 2 – billing blocks + Stripe (remove together):**

10. Billing blocks package
11. `@stripe/react-stripe-js`
12. `@stripe/stripe-js`

**Phase 3 – optional (verified not in our source: design-system, components, stories):**

13. `@react-pdf/renderer`, `jspdf`, `html2canvas`, `html2pdf.js`, `jszip` – not imported
14. `@knocklabs/react` – not imported (top-level only)
15. `axios` – only used by @knocklabs/client; removable if @knocklabs/react is removed

---

## Transitive dependencies

- Removing the billing blocks package will drop Stripe (it's a direct dependency).
- `@knocklabs/react` is top-level; no package in our tree depends on it, so it can be removed if we don't use it.
- `axios` is used by `@knocklabs/client`; if we remove `@knocklabs/react`, axios may become removable depending on other deps.

---

## Commands to test after removal

```bash
npm run build-storybook   # Must pass
npm run lint             # Must pass
npm run storybook        # Dev server – spot-check key stories
```
