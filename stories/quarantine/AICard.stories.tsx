import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { AICard } from "@/design-system/ai-card";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof AICard> = {
  title: "🚧 Quarantine/AICard",
  component: AICard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "⚠️ **PENDING DESIGN REVIEW** - This component is in quarantine awaiting designer approval before being added to the main design system.",
      },
    },
    backgrounds: {
      default: "quarantine",
      values: [{ name: "quarantine", value: "#fff3cd" }],
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    title: {
      control: "text",
      description: "Optional title displayed above the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    rows: {
      control: "number",
      description: "Number of rows for the textarea",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AICard>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <AICard {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: "Describe your request",
    placeholder: "Describe your request in natural language...",
    rows: 8,
  },
};

export const WithExampleButtons: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <AICard {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: "Describe your CPQ rule",
    placeholder: "Describe your CPQ rule in natural language...",
    rows: 8,
    exampleButtons: [
      {
        title: "Inclusion rule",
        description:
          "If customer selects Microsoft Office 365, automatically include Azure Active Directory Basic",
        icon: "add",
      },
      {
        title: "Exclusion rule",
        description:
          // eslint-disable-next-line agent-loupe-ui/sentence-case
          "If customer has Oracle Database Enterprise, cannot add PostgreSQL Support Package",
        icon: "remove",
      },
      {
        title: "Quantity constraint",
        description:
          "Salesforce sandbox environments cannot exceed 5 per production licence",
        icon: "list_numbered",
      },
    ],
  },
};

export const NoTitle: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <AICard {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: "Type your message here...",
    rows: 6,
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <AICard {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: "Create a new workflow",
    placeholder:
      "What would you like to automate? Be as specific as possible...",
    rows: 10,
  },
};

export const WithPrefilledValue: Story = {
  render: (args) => {
    const [value, setValue] = useState(
      "If customer selects Microsoft Office 365, automatically include Azure Active Directory Basic",
    );
    return <AICard {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: "Edit your rule",
    placeholder: "Describe your CPQ rule in natural language...",
    rows: 8,
    exampleButtons: [
      {
        title: "Inclusion rule",
        description:
          "If customer selects Microsoft Office 365, automatically include Azure Active Directory Basic",
        icon: "add",
      },
      {
        title: "Exclusion rule",
        description:
          // eslint-disable-next-line agent-loupe-ui/sentence-case
          "If customer has Oracle Database Enterprise, cannot add PostgreSQL Support Package",
        icon: "remove",
      },
    ],
  },
};

export const CompactVersion: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <AICard {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: "Quick input",
    placeholder: "Enter a brief description...",
    rows: 4,
  },
};
