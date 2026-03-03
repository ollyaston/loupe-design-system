import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    // Ensure base path is set correctly for production builds
    // This fixes dynamic import issues when deployed to GitHub Pages
    // Set base to '/' for root domain deployment
    config.base = config.base || "/";

    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          // Ensure dynamic imports use relative paths
          // This prevents issues with absolute paths in production
          manualChunks: undefined,
        },
      };
    }
    return config;
  },
};
export default config;
