import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Switch } from "@/design-system/switch";
import { Label } from "@/design-system/label";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Switch,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="Airplane mode" required>
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Enable airplane mode</Label>
      </div>
    </FormField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormField
      label="Dark mode"
      description="Switch between light and dark themes"
    >
      <div className="flex items-center space-x-2">
        <Switch id="dark-mode" />
        <Label htmlFor="dark-mode">Enable dark mode</Label>
      </div>
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField
      label="Auto-save"
      required
      hintText="Automatically save your work every few minutes to prevent data loss"
    >
      <div className="flex items-center space-x-2">
        <Switch id="auto-save" />
        <Label htmlFor="auto-save">Enable auto-save</Label>
      </div>
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <FormField
      label="Email notifications"
      layout="horizontal"
      description="Receive email updates about important events"
    >
      <div className="flex items-center space-x-2">
        <Switch id="email-notifications" />
        <Label htmlFor="email-notifications">Enable email notifications</Label>
      </div>
    </FormField>
  ),
};

export const Checked: Story = {
  render: () => (
    <FormField label="Pre-enabled feature">
      <div className="flex items-center space-x-2">
        <Switch id="pre-enabled" checked />
        <Label htmlFor="pre-enabled">This feature is enabled by default</Label>
      </div>
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField
      label="Disabled feature"
      description="This feature is currently unavailable"
    >
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled">This feature is disabled</Label>
      </div>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Error state" description="This switch has an error state">
      <div className="flex items-center space-x-2">
        <Switch id="error-switch" error />
        <Label htmlFor="error-switch">This switch has an error</Label>
      </div>
    </FormField>
  ),
};

export const MultipleSwitches: Story = {
  render: () => (
    <FormField
      label="Notification settings"
      required
      description="Configure how you'd like to receive notifications"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="notifications" />
          <Label htmlFor="notifications">Push notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="marketing" />
          <Label htmlFor="marketing">Marketing emails</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="updates" />
          <Label htmlFor="updates">System updates</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="security" />
          <Label htmlFor="security">Security alerts</Label>
        </div>
      </div>
    </FormField>
  ),
};
