import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChatMessage } from "@/design-system/chat-message";

const meta: Meta<typeof ChatMessage> = {
  component: ChatMessage,
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["user", "assistant", "system"],
      description: "The role of the message sender",
    },
    content: {
      control: "text",
      description: "The message content",
    },
    attachments: {
      control: "object",
      description: "Array of attachments to display",
    },
    isLoading: {
      control: "boolean",
      description: "Whether to show loading state",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    showAttachments: {
      control: "boolean",
      description: "Whether to show attachments",
    },
    maxAttachmentHeight: {
      control: "number",
      description: "Maximum height for attachment images",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    role: "user",
    content: "Hello! Can you help me create a dashboard component?",
    isLoading: false,
  },
};

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    content:
      "Of course! I'd be happy to help you create a dashboard component. What kind of data would you like to display?",
    isLoading: false,
  },
};

export const LoadingMessage: Story = {
  args: {
    role: "assistant",
    content: "",
    isLoading: true,
  },
};

export const UserMessageWithImage: Story = {
  args: {
    role: "user",
    content: "Here's the design I'd like you to implement:",
    attachments: [
      {
        name: "dashboard-design.png",
        contentType: "image/png",
        url: "https://picsum.photos/400/300",
      },
    ],
    isLoading: false,
  },
};

export const AssistantMessageWithCode: Story = {
  args: {
    role: "assistant",
    content: `I've created a dashboard component for you! Here's the code:

\`\`\`jsx
import React from 'react';

export function Dashboard() {
  return (
    <div className="p-6 bg-background rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-info rounded-lg">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-lg font-bold text-info">1,234</p>
        </div>
        <div className="p-4 bg-success rounded-lg">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-lg font-bold text-success">$45,678</p>
        </div>
        <div className="p-4 bg-info-foreground rounded-lg">
          <h3 className="font-semibold">Orders</h3>
          <p className="text-lg font-bold text-info">567</p>
        </div>
      </div>
    </div>
  );
}
\`\`\`

This component creates a responsive dashboard with three metric cards. Let me know if you'd like any changes!`,
    isLoading: false,
  },
};

export const LongMessage: Story = {
  args: {
    role: "assistant",
    content: `This is a very long message that demonstrates how the component handles text that wraps to multiple lines. The message should maintain proper spacing and readability while fitting within the container.

The component should handle:
- Long paragraphs of text
- Multiple line breaks
- Proper word wrapping
- Consistent spacing and padding

This ensures that users can read longer responses comfortably without the text becoming cramped or difficult to follow.`,
    isLoading: false,
  },
};

export const SystemMessage: Story = {
  args: {
    role: "system",
    content: "System message: User has uploaded an image for analysis",
    isLoading: false,
  },
};

export const MultipleAttachments: Story = {
  args: {
    role: "user",
    content: "Here are multiple images for reference:",
    attachments: [
      {
        name: "design-1.png",
        contentType: "image/png",
        url: "https://picsum.photos/400/200?random=1",
      },
      {
        name: "design-2.png",
        contentType: "image/png",
        url: "https://picsum.photos/400/200?random=2",
      },
    ],
    isLoading: false,
  },
};

export const WithoutAttachments: Story = {
  args: {
    role: "user",
    content: "This message has attachments but they're hidden",
    attachments: [
      {
        name: "hidden-image.png",
        contentType: "image/png",
        url: "https://picsum.photos/400/300",
      },
    ],
    showAttachments: false,
    isLoading: false,
  },
};

export const Conversation: Story = {
  args: {
    role: "user",
    content: "Hello! Can you help me create a dashboard component?",
    isLoading: false,
  },
  render: (args) => (
    <div className="*:space-y-4">
      <ChatMessage {...args} />
      <ChatMessage
        role="assistant"
        content="Of course! I'd be happy to help you create a dashboard component. What kind of data would you like to display?"
        isLoading={false}
      />
      <ChatMessage
        role="user"
        content="I need to show user statistics, revenue data, and recent orders."
        isLoading={false}
      />
      <ChatMessage role="assistant" content="" isLoading={true} />
    </div>
  ),
};
