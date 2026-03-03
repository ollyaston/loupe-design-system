// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "storybook-static/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.tsx", "**/*.ts"],
    plugins: {
      "unused-imports": unusedImports,
      "agent-loupe-ui": {
        rules: {
          "loupe-system-class": (
            await import("./eslint-rules/loupe-system-class.mjs")
          ).default,
          "large-text-classes": (
            await import("./eslint-rules/large-text-classes.mjs")
          ).default,
          "literal-color-classes": (
            await import("./eslint-rules/literal-color-classes.mjs")
          ).default,
          "no-app-state-in-design-system": (
            await import("./eslint-rules/no-app-state-in-design-system.mjs")
          ).default,
          "ui-component-story-required": (
            await import("./eslint-rules/ui-component-story-required.mjs")
          ).default,
          "sentence-case": (await import("./eslint-rules/sentence-case.mjs"))
            .default,
        },
      },
    },
    rules: {
      // design system
      "agent-loupe-ui/loupe-system-class": "error",
      "agent-loupe-ui/large-text-classes": "warn",
      "agent-loupe-ui/literal-color-classes": "error",
      "agent-loupe-ui/no-app-state-in-design-system": "error",
      "agent-loupe-ui/ui-component-story-required": "error",
      "agent-loupe-ui/sentence-case": "error",

      // imports
      "unused-imports/no-unused-imports": "warn",

      // typescript
      "@typescript-eslint/no-unused-vars": "off", // use unused-imports/no-unused-imports instead
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-require-imports": "error",

      // react
      "react/no-unescaped-entities": "error",
      "react/no-children-prop": "error",
      "react/jsx-key": "error",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",

      // next js (design-system-only: no app pages, so disable pages rule)
      "@next/next/inline-script-id": "error",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "error",
      "@next/next/google-font-display": "error",
      "@next/next/no-page-custom-font": "error",

      // accessibility
      "jsx-a11y/alt-text": "error",
    },
    ignores: [],
  },
];

export default eslintConfig;
