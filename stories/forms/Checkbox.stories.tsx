import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/design-system/checkbox";
import { FormField } from "@/design-system/form-field";
import { Label } from "@/design-system/label";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="Accept terms and conditions" required>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
    </FormField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormField
      label="Marketing preferences"
      description="Choose how you'd like to receive updates from us"
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Send me marketing emails</Label>
      </div>
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField
      label="Data processing consent"
      required
      hintText="We need your consent to process your personal data in accordance with GDPR regulations"
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="consent" />
        <Label htmlFor="consent">I consent to data processing</Label>
      </div>
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <FormField
      label="Newsletter subscription"
      layout="horizontal"
      description="Stay updated with our latest news and features"
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
    </FormField>
  ),
};

export const Checked: Story = {
  render: () => (
    <FormField label="Pre-checked Option">
      <div className="flex items-center space-x-2">
        <Checkbox id="prechecked" checked />
        <Label htmlFor="prechecked">This option is pre-selected</Label>
      </div>
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField
      label="Disabled option"
      description="This option is currently disabled"
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">This option is disabled</Label>
      </div>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField
      label="Terms and conditions"
      required
      description="You must accept the terms and conditions to continue"
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="terms-error" error />
        <Label htmlFor="terms-error">I agree to the terms and conditions</Label>
      </div>
    </FormField>
  ),
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <FormField
      label="Notification preferences"
      required
      description="Select all the types of notifications you'd like to receive"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="option1" />
          <Label htmlFor="option1">Email notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option2" />
          <Label htmlFor="option2">SMS notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option3" />
          <Label htmlFor="option3">Push notifications</Label>
        </div>
      </div>
    </FormField>
  ),
};
