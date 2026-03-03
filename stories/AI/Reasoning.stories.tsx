import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ReasoningPartsRenderer } from "@/design-system/shadcn-io/ai/reasoning";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof ReasoningPartsRenderer> = {
  component: ReasoningPartsRenderer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    message: {
      control: "object",
      description: "The UIMessage containing reasoning parts",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock message with reasoning part in streaming state
const streamingReasoningMessage = {
  id: "1",
  role: "assistant" as const,
  parts: [
    {
      type: "reasoning" as const,
      text: "## Analyzing the Problem\n\nLet me break down this complex issue into manageable parts. First, I need to understand the requirements...",
      state: "streaming" as const,
    },
  ],
};

// Mock message with completed reasoning
const completedReasoningMessage = {
  id: "2",
  role: "assistant" as const,
  parts: [
    {
      type: "reasoning" as const,
      text: "## Problem Analysis Complete\n\nI've thoroughly analyzed the requirements and identified the key components:\n\n1. User interface design\n2. Data management\n3. State handling\n4. Performance optimization\n\nEach component has been carefully considered to ensure the best user experience.",
      state: "done" as const,
    },
  ],
};

// Mock message with web search tool part
const webSearchMessage = {
  id: "3",
  role: "assistant" as const,
  parts: [
    {
      type: "tool-web_search_preview" as const,
      toolCallId: "search-1",
      state: "input-streaming" as const,
      input: {},
    },
  ],
};

// Mock message with completed web search
const completedWebSearchMessage = {
  id: "4",
  role: "assistant" as const,
  parts: [
    {
      type: "tool-web_search_preview" as const,
      toolCallId: "search-2",
      state: "output-available" as const,
      input: {},
      output: {},
    },
  ],
};

// Mock message with multiple reasoning parts
const multipleReasoningMessage = {
  id: "5",
  role: "assistant" as const,
  parts: [
    {
      type: "reasoning" as const,
      text: "## Initial Analysis\n\nStarting with the basic requirements...",
      state: "done" as const,
    },
    {
      type: "reasoning" as const,
      text: "## Deep Dive\n\nNow let me examine the technical details more thoroughly...",
      state: "done" as const,
    },
    {
      type: "reasoning" as const,
      text: "## Final Considerations\n\nTaking into account all the factors, here's my conclusion...",
      state: "streaming" as const,
    },
  ],
};

export const StreamingReasoning: Story = {
  args: {
    message: streamingReasoningMessage,
  },
};

export const CompletedReasoning: Story = {
  args: {
    message: completedReasoningMessage,
  },
};

export const WebSearchStreaming: Story = {
  args: {
    message: webSearchMessage,
  },
};

export const WebSearchCompleted: Story = {
  args: {
    message: completedWebSearchMessage,
  },
};

export const MultipleReasoningParts: Story = {
  args: {
    message: multipleReasoningMessage,
  },
};

export const NoReasoningParts: Story = {
  args: {
    message: {
      id: "6",
      role: "assistant" as const,
      parts: [],
    },
  },
};

export const LongReasoningText: Story = {
  args: {
    message: {
      id: "7",
      role: "assistant" as const,
      parts: [
        {
          type: "reasoning" as const,
          text: `## Comprehensive Analysis

This is a very detailed reasoning process that spans multiple paragraphs and demonstrates how the component handles longer text content. The reasoning block should properly display all the content while maintaining readability.

### Key Findings

1. **Performance Considerations**: The application needs to handle large datasets efficiently
2. **User Experience**: The interface should be intuitive and responsive
3. **Scalability**: The solution must grow with the business needs
4. **Maintainability**: Code should be well-structured and documented

### Technical Implementation

The implementation will require careful planning and execution. Each component needs to be designed with the overall architecture in mind.

### Conclusion

After thorough analysis, I'm confident this approach will meet all the requirements while providing a solid foundation for future enhancements.`,
          state: "done" as const,
        },
      ],
    },
  },
};

export const ReasoningWithTitle: Story = {
  args: {
    message: {
      id: "8",
      role: "assistant" as const,
      parts: [
        {
          type: "reasoning" as const,
          text: "## Database Optimization Strategy\n\nI need to analyze the current database performance and identify bottlenecks...",
          state: "streaming" as const,
        },
      ],
    },
  },
};
