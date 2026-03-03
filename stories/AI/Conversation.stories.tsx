import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/design-system/shadcn-io/ai/conversation";
import {
  Message,
  MessageContent,
  MessageAvatar,
} from "@/design-system/shadcn-io/ai/message";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Conversation> = {
  component: Conversation,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicConversation: Story = {
  render: () => (
    <div className="h-96 border rounded-lg">
      <Conversation>
        <ConversationContent>
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
                Of course! I&apos;d be happy to help you create a dashboard
                component. What kind of data would you like to display?
              </MessageContent>
            </Message>
          </div>
        </ConversationContent>
      </Conversation>
    </div>
  ),
};

export const LongConversation: Story = {
  render: () => (
    <div className="h-96 border rounded-lg">
      <Conversation>
        <ConversationContent>
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
                Of course! I&apos;d be happy to help you create a dashboard
                component. What kind of data would you like to display?
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
                Perfect! I&apos;ll create a dashboard component that displays
                those metrics. Let me build that for you.
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                Can you also add charts and graphs for the data visualization?
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                Absolutely! I&apos;ll include interactive charts using a
                charting library. Here&apos;s what I&apos;ll add: - Line charts
                for revenue trends - Bar charts for user statistics - Pie charts
                for order distribution - Real-time data updates
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                That sounds great! What about responsive design?
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                The dashboard will be fully responsive with: - Mobile-first
                design approach - Flexible grid layouts - Touch-friendly
                interactions - Adaptive chart sizing - Collapsible sidebar on
                mobile
              </MessageContent>
            </Message>
          </div>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  ),
};

export const ConversationWithScrollButton: Story = {
  render: () => (
    <div className="h-64 border rounded-lg">
      <Conversation>
        <ConversationContent>
          <div className="space-y-4">
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                This conversation has enough content to trigger the scroll
                button.
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                Yes, when there&apos;s more content than can fit in the visible
                area, the scroll button will appear.
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                The scroll button allows users to quickly jump to the bottom of
                the conversation.
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                Exactly! It&apos;s a great UX feature for long conversations.
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                This is another message to make the conversation longer.
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                And this is the final message that should trigger the scroll
                button.
              </MessageContent>
            </Message>
          </div>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  ),
};

export const ConversationContentOnly: Story = {
  render: () => (
    <div className="h-64 border rounded-lg">
      <Conversation>
        <ConversationContent>
          <div className="space-y-4">
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                This shows just the conversation content without the scroll
                functionality.
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                It&apos;s useful for simpler implementations where you
                don&apos;t need the scroll-to-bottom feature.
              </MessageContent>
            </Message>
          </div>
        </ConversationContent>
      </Conversation>
    </div>
  ),
};

export const ScrollButtonOnly: Story = {
  render: () => (
    <div className="h-64 border rounded-lg relative">
      <Conversation>
        <div className="p-4">
          <p>This demonstrates the scroll button component in isolation.</p>
          <p>
            The button appears when the user is not at the bottom of the
            conversation.
          </p>
          <p>Clicking it will scroll to the bottom smoothly.</p>
          <div className="mt-8">
            <ConversationScrollButton />
          </div>
        </div>
      </Conversation>
    </div>
  ),
};

export const EmptyConversation: Story = {
  render: () => (
    <div className="h-64 border rounded-lg">
      <Conversation>
        <ConversationContent>
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No messages yet. Start a conversation!</p>
          </div>
        </ConversationContent>
      </Conversation>
    </div>
  ),
};

export const ConversationWithCode: Story = {
  render: () => (
    <div className="h-96 border rounded-lg">
      <Conversation>
        <ConversationContent>
          <div className="space-y-4">
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                Can you show me how to implement a React component?
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                Sure! Here&apos;s a basic React component:
                <pre className="mt-2 p-2 bg-muted rounded text-sm">
                  {`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`}
                </pre>
                This component uses the `useState` hook to manage state.
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageAvatar src="/api/placeholder/32/32" name="John Doe" />
              <MessageContent>
                Thanks! Can you also show me how to add TypeScript?
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/32/32" name="AI Assistant" />
              <MessageContent>
                Absolutely! Here&apos;s the same component with TypeScript:
                <pre className="mt-2 p-2 bg-muted rounded text-sm">
                  {`import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`}
                </pre>
                The TypeScript version adds type safety and better IntelliSense
                support.
              </MessageContent>
            </Message>
          </div>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  ),
};
