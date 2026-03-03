import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Textarea } from "@/design-system/textarea";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Textarea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="Message" required>
      <Textarea placeholder="Type your message here." />
    </FormField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormField
      label="Bio"
      required
      description="Tell us a little bit about yourself. You can @mention other users and organizations."
    >
      <Textarea
        placeholder="Tell us a little bit about yourself"
        className="resize-none"
        rows={4}
      />
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField
      label="Project description"
      required
      hintText="Provide a detailed description of your project. Include goals, timeline, and any specific requirements."
    >
      <Textarea
        placeholder="Describe your project..."
        className="resize-none"
        rows={6}
      />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <FormField
      label="Comments"
      layout="horizontal"
      description="Share any additional thoughts or feedback"
    >
      <Textarea
        placeholder="Add your comments here..."
        className="resize-none"
        rows={3}
      />
    </FormField>
  ),
};

export const WithValue: Story = {
  render: () => (
    <FormField label="Pre-filled content">
      <Textarea
        value="This is a textarea with some pre-filled content."
        className="resize-none"
        rows={3}
      />
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField
      label="Disabled field"
      description="This field is currently disabled"
    >
      <Textarea
        value="This textarea is disabled."
        disabled
        className="resize-none"
        rows={3}
      />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField
      label="Message"
      required
      description="Please enter a valid message"
    >
      <Textarea
        placeholder="Type your message here..."
        error={true}
        className="resize-none"
        rows={4}
      />
    </FormField>
  ),
};
