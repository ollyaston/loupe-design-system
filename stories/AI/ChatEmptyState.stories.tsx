import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChatEmptyState } from "@/design-system/chat-empty-state";

const meta: Meta<typeof ChatEmptyState> = {
  component: ChatEmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title text to display",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    icon: {
      control: false,
      description: "Custom icon element (React node)",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Start a conversation",
    showIcon: true,
  },
};

export const WithPrompt: Story = {
  args: {
    title: "Send a message to get started",
    showIcon: true,
  },
};

export const NoIcon: Story = {
  args: {
    title: "Start a conversation",
    showIcon: false,
  },
};

export const CustomIcon: Story = {
  args: {
    title: "Welcome to the chat",
    showIcon: true,
    icon: (
      <div className="w-16 h-16 rounded-full bg-info flex items-center justify-center mx-auto mb-4">
        <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-info rounded-full"></div>
        </div>
      </div>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: "This is a very long title that might wrap to multiple lines",
    showIcon: true,
  },
};

export const ShortTitle: Story = {
  args: {
    title: "Chat",
    showIcon: true,
  },
};
