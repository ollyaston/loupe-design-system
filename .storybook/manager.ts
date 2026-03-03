import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Loupe",
    brandUrl: "/",
    brandImage: "/Loupe_Logo_Wordmark.svg",
    brandTarget: "_self",
    fontBase: '"DM Serif Text", serif',
  }),
});
