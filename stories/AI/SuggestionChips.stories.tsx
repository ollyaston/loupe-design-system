import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SuggestionChips } from "@/design-system/suggestion-chips";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof SuggestionChips> = {
  component: SuggestionChips,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    suggestions: {
      control: "object",
      description: "Array of suggestion strings to display",
    },
    onSuggestionClick: {
      action: "suggestion-clicked",
      description: "Callback when a suggestion is clicked",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    suggestions: [
      "Summarize this document",
      "Create a chart from data",
      "Generate a list of ideas",
      "Explain this in simple terms",
      "Compare two options",
      "Draft an outline",
    ],
    onSuggestionClick: (suggestion: string) =>
      console.log("Suggestion clicked:", suggestion),
  },
};

export const FewSuggestions: Story = {
  args: {
    suggestions: ["Simple chart", "Data table", "Summary card"],
    onSuggestionClick: (suggestion: string) =>
      console.log("Suggestion clicked:", suggestion),
  },
};

export const ManySuggestions: Story = {
  args: {
    suggestions: [
      "Summarize this document",
      "Create a chart from data",
      "Generate a list of ideas",
      "Explain this in simple terms",
      "Compare two options",
      "Draft an outline",
      "Brainstorm solutions",
      "Write a summary",
      "Analyze pros and cons",
      "Create a task list",
      "Suggest improvements",
      "Generate talking points",
    ],
    onSuggestionClick: (suggestion: string) =>
      console.log("Suggestion clicked:", suggestion),
  },
};

export const EmptySuggestions: Story = {
  args: {
    suggestions: [],
    onSuggestionClick: (suggestion: string) =>
      console.log("Suggestion clicked:", suggestion),
  },
};
