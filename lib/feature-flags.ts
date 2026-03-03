/**
 * Feature flags stub for design-system-only build.
 * No LaunchDarkly or other external service – returns safe defaults.
 */

const DEFAULT_FLAGS = {
  insetScrolling: false,
} as const;

export function useFeatureFlags() {
  return DEFAULT_FLAGS;
}
