import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Alert } from "@/design-system/alert";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "The alert variant",
    },
    icon: {
      control: "select",
      options: ["info", "warning", "success", "error"],
      description: "The alert icon",
    },
    title: {
      control: "text",
      description: "The alert title",
    },
    description: {
      control: "text",
      description: "The alert description",
    },
    actionContent: {
      control: false,
      description: "Action content (buttons, etc.)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "info",
    title: "Heads up!",
    description:
      "You can add components and dependencies to your app using the cli.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: "warning",
    title: "Error",
    description: "Your session has expired. Please log in again.",
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "Notice",
    description: "This is an alert without an icon.",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Just a title",
  },
};

export const TitleWithIcon: Story = {
  args: {
    icon: "info",
    title: "Just a title with an icon",
  },
};

export const WithSingleAction: Story = {
  args: {
    icon: "info",
    title: "Update available",
    description:
      "A new version of the app is available. Would you like to update now?",
    actionContent: (
      <Button size="sm" variant="default">
        Update
      </Button>
    ),
  },
};

export const WithTwoActions: Story = {
  args: {
    variant: "destructive",
    icon: "warning",
    title: "Unsaved changes",
    description: "You have unsaved changes that will be lost if you continue.",
    actionContent: (
      <>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
        <Button size="sm" variant="destructive">
          Discard
        </Button>
      </>
    ),
  },
};

export const WithActionButtonsDefault: Story = {
  args: {
    icon: "info",
    title: "New feature available",
    description:
      "Check out our latest feature that can help improve your workflow.",
    actionContent: (
      <>
        <Button size="sm" variant="outline">
          Learn more
        </Button>
        <Button size="sm" variant="default">
          Try it now
        </Button>
      </>
    ),
  },
};
