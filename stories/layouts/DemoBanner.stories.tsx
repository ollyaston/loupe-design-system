import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DemoBanner } from "@/design-system/demo-banner";

const meta: Meta<typeof DemoBanner> = {
  component: DemoBanner,
  title: "Layouts/DemoBanner",
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Additional CSS classes to apply to the banner",
      control: "text",
    },
    icon: {
      description:
        "Icon name for the left-most icon (ignored if backButtonText is provided)",
      control: "text",
    },
    title: {
      description:
        "Text displayed next to the icon on the left (ignored if backButtonText is provided)",
      control: "text",
    },
    children: {
      description: "Content displayed in the center of the banner",
      control: "text",
    },
    actionText: {
      description: "Text for the action button (if empty, no button is shown)",
      control: "text",
    },
    onActionClick: {
      description: "Callback function when the action button is clicked",
      action: "action clicked",
    },
    backButtonText: {
      description:
        "Text for the back button (replaces icon and title when provided)",
      control: "text",
    },
    onBackClick: {
      description: "Callback function when the back button is clicked",
      action: "back clicked",
    },
    backIcon: {
      description: "Icon name for the back button (displayed before text)",
      control: "text",
    },
    actionIcon: {
      description: "Icon name for the action button (displayed after text)",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DemoBanner>;

export const Basic: Story = {
  args: {
    icon: "play_shapes",
    title: "Demo",
    children: "This is a demo banner",
    actionText: "Get started",
  },
};

export const TestMode: Story = {
  args: {
    icon: "science",
    title: "Test mode",
    children:
      "You're in test mode. No emails will be sent, payments will not be processed, and third-party integrations are disabled.",
  },
};

export const CustomIcon: Story = {
  args: {
    icon: "star",
    title: "Premium",
    children: "Upgrade to unlock premium features",
    actionText: "Upgrade now",
  },
};

export const CustomContent: Story = {
  args: {
    icon: "info",
    title: "Notice",
    children: "This is a custom notice message with important information",
    actionText: "Learn more",
  },
};

export const WithBackButton: Story = {
  args: {
    backButtonText: "Back",
    backIcon: "arrow_back",
    children: "You're in a sub-section. Use the back button to return.",
    actionText: "Continue",
    actionIcon: "arrow_forward",
  },
};

export const BackAndAction: Story = {
  args: {
    backButtonText: "Back",
    backIcon: "arrow_back",
    children: "Review your settings before proceeding",
    actionText: "Save & continue",
    actionIcon: "check",
  },
};

export const BackOnly: Story = {
  args: {
    backButtonText: "Go back",
    backIcon: "arrow_back",
    children: "This section has only a back button, no action button.",
  },
};

export const IconOnlyButtons: Story = {
  args: {
    backButtonText: "",
    backIcon: "arrow_back",
    children: "Navigation with icon-only buttons",
    actionText: "",
    actionIcon: "arrow_forward",
  },
};
