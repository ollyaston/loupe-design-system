import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InlineEditableText } from "../../design-system/inline-editable-text";
import { Container } from "@/components/layouts/container";
import { FormField } from "@/design-system/form-field";
import { useState } from "react";

const meta: Meta<typeof InlineEditableText> = {
  component: InlineEditableText,
  tags: ["autodocs"],
  title: "Forms/InlineEditableText",
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    value: {
      control: "text",
      description: "The current text value",
    },
    onValueChange: {
      action: "valueChanged",
      description: "Callback when the value changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when value is empty",
    },
    multiline: {
      control: "boolean",
      description: "Whether to use a textarea for multiline input",
    },
    mutedWhenEmpty: {
      control: "boolean",
      description: "Whether to mute the text color when empty",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
    inputClassName: {
      control: "text",
      description: "Additional CSS classes for the input/textarea",
    },
    displayClassName: {
      control: "text",
      description: "Additional CSS classes for the display text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineEditableText>;

// Default single-line editable text
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("Click to edit this text");

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Add text..."
      />
    );
  },
};

// Empty state with placeholder
export const EmptyState: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Click to add a description..."
      />
    );
  },
};

// Multiline textarea variant
export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState(
      "This is a longer text that can span multiple lines. Click to edit.",
    );

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Add description..."
        multiline
      />
    );
  },
};

// Multiline with empty state
export const MultilineEmpty: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Click to add a detailed description..."
        multiline
      />
    );
  },
};

// With custom styling for heading
export const AsHeading: Story = {
  render: () => {
    const [value, setValue] = useState("Order #12345");

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Add order name..."
        displayClassName="text-lg font-bold"
        inputClassName="text-lg font-bold"
        mutedWhenEmpty={false}
      />
    );
  },
};

// With custom styling for subheading
export const AsSubheading: Story = {
  render: () => {
    const [value, setValue] = useState("Customer: acme corp");

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Add customer info..."
        displayClassName="text-lg font-semibold text-muted-foreground"
        inputClassName="text-lg font-semibold"
      />
    );
  },
};

// Not muted when empty
export const NotMutedWhenEmpty: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <InlineEditableText
        value={value}
        onValueChange={setValue}
        placeholder="Add title..."
        mutedWhenEmpty={false}
        displayClassName="text-base font-semibold"
        inputClassName="text-base font-semibold"
      />
    );
  },
};

// In a form context
export const InForm: Story = {
  render: () => {
    const [title, setTitle] = useState("Project alpha");
    const [description, setDescription] = useState(
      "A comprehensive project description goes here.",
    );

    return (
      <div className="max-w-md space-y-4">
        <FormField label="Project title" required>
          <InlineEditableText
            value={title}
            onValueChange={setTitle}
            placeholder="Enter project title..."
            displayClassName="text-lg font-semibold"
            inputClassName="text-lg font-semibold"
          />
        </FormField>

        <FormField
          label="Description"
          description="Provide a detailed description of the project"
        >
          <InlineEditableText
            value={description}
            onValueChange={setDescription}
            placeholder="Enter project description..."
            multiline
          />
        </FormField>
      </div>
    );
  },
};

// Demonstrating interactive editing
export const Interactive: Story = {
  render: () => {
    const [title, setTitle] = useState("Interactive example");
    const [description, setDescription] = useState(
      "Click on any text to edit it. Press Escape to cancel or Enter/blur to save.",
    );

    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg space-y-3">
          <InlineEditableText
            value={title}
            onValueChange={setTitle}
            placeholder="Add title..."
            displayClassName="text-base font-bold"
            inputClassName="text-base font-bold h-10"
            mutedWhenEmpty={false}
          />

          <InlineEditableText
            value={description}
            onValueChange={setDescription}
            placeholder="Add description..."
            multiline
          />
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Current values:</p>
          <p className="text-sm">Title: {title || "(empty)"}</p>
          <p className="text-sm">Description: {description || "(empty)"}</p>
        </div>
      </div>
    );
  },
};
