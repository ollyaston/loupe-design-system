import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/design-system/input";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="Full name" required>
      <Input placeholder="Enter your name" />
    </FormField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormField
      label="Email address"
      required
      description="We'll use this to send you important updates"
    >
      <Input placeholder="Enter your email" type="email" />
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField
      label="API key"
      required
      hintText="Your API key is used to authenticate requests. Keep it secure and never share it publicly."
    >
      <Input placeholder="sk-..." type="password" />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <FormField
      label="Username"
      required
      layout="horizontal"
      description="This will be your public display name"
    >
      <Input placeholder="Enter username" />
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField
      label="Disabled field"
      description="This field is currently disabled"
    >
      <Input placeholder="Enter your name" disabled />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField
      label="Email address"
      required
      description="Please enter a valid email address"
    >
      <Input placeholder="Enter your email" error={true} />
    </FormField>
  ),
};
