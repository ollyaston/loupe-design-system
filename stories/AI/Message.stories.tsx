import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Message,
  MessageContent,
  MessageAvatar,
} from "@/design-system/shadcn-io/ai/message";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Message> = {
  component: Message,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    from: {
      control: "select",
      options: ["user", "assistant"],
      description: "The role of the message sender",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    from: "user",
  },
  render: (args) => (
    <Message {...args}>
      <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
      <MessageContent>
        Hello! Can you help me create a dashboard component?
      </MessageContent>
    </Message>
  ),
};

export const AssistantMessage: Story = {
  args: {
    from: "assistant",
  },
  render: (args) => (
    <Message {...args}>
      <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
      <MessageContent>
        Of course! I&apos;d be happy to help you create a dashboard component.
        What kind of data would you like to display?
      </MessageContent>
    </Message>
  ),
};

export const UserMessageWithLongContent: Story = {
  args: {
    from: "user",
  },
  render: (args) => (
    <Message {...args}>
      <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
      <MessageContent>
        This is a very long message that demonstrates how the component handles
        text that wraps to multiple lines. The message should maintain proper
        spacing and readability while fitting within the container. The
        component should handle long paragraphs of text, multiple line breaks,
        proper word wrapping, and consistent spacing and padding.
      </MessageContent>
    </Message>
  ),
};

export const AssistantMessageWithCode: Story = {
  args: {
    from: "assistant",
  },
  render: (args) => (
    <Message {...args}>
      <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
      <MessageContent>
        Here&apos;s the code for your dashboard component:
        <pre className="mt-2 p-2 bg-muted rounded text-sm">
          {`import React from 'react';

export function Dashboard() {
  return (
    <div className="p-6 bg-background rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-info rounded-lg">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-lg font-bold text-info">1,234</p>
        </div>
      </div>
    </div>
  );
}`}
        </pre>
      </MessageContent>
    </Message>
  ),
};

export const MessageContentOnly: Story = {
  render: () => (
    <MessageContent>
      This is just the message content without the full message wrapper.
    </MessageContent>
  ),
};

export const MessageAvatarOnly: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
      <span>John Doe</span>
    </div>
  ),
};

export const MessageAvatarWithFallback: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <MessageAvatar src="" name="John Doe" />
      <span>John Doe (fallback)</span>
    </div>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4">
      <Message from="user">
        <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
        <MessageContent>
          Hello! Can you help me create a dashboard component?
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
        <MessageContent>
          Of course! I&apos;d be happy to help you create a dashboard component.
          What kind of data would you like to display?
        </MessageContent>
      </Message>
      <Message from="user">
        <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
        <MessageContent>
          I need to show user statistics, revenue data, and recent orders.
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
        <MessageContent>
          Perfect! I&apos;ll create a dashboard component that displays those
          metrics. Let me build that for you.
        </MessageContent>
      </Message>
    </div>
  ),
};
