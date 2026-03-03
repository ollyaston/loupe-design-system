import React from "react";
import type { Preview, ReactRenderer } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import StorybookLayout from "./StorybookLayout";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: [
          "Welcome",
          "Foundations",
          "Text",
          "Icons",
          "Primitives",
          "Buttons",
          "Cards",
          "Charts",
          "Code",
          "Forms",
          "Loading",
          "Tables",
          "Layouts",
          "AI",
          "Date-and-Time",
          "Modals-and-Popups",
          "Sidebar",
          "Steppers",
          "Archive",
          "Quarantine",
        ],
      },
      initialStory: "Welcome",
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        StorybookLayout,
        {} as React.ComponentProps<typeof StorybookLayout>,
        React.createElement(Story),
      );
    },
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
