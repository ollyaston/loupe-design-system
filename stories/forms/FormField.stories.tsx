import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "../../design-system/form-field";
import { Input } from "../../design-system/input";
import { Textarea } from "../../design-system/textarea";
import { Select } from "../../design-system/select";
import { Checkbox } from "../../design-system/checkbox";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof FormField> = {
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible form field component that wraps form inputs with labels, descriptions, and optional hint text. Supports both horizontal and vertical layouts.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Email address",
    required: true,
    description: "We'll never share your email with anyone else.",
    hintText:
      "This email will be used for account notifications and password resets.",
    children: <Input placeholder="Enter your email" />,
  },
};

export const VerticalLayout: Story = {
  args: {
    label: "Full name",
    required: true,
    layout: "vertical",
    description:
      "Enter your first and last name as it appears on official documents.",
    children: <Input placeholder="Your name" />,
  },
};

export const HorizontalLayout: Story = {
  args: {
    label: "Country",
    required: false,
    layout: "horizontal",
    description: "Select your country of residence.",
    hintText: "This helps us provide region-specific features and compliance.",
    children: (
      <Select
        placeholder="Select a country"
        options={[
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
        ]}
      />
    ),
  },
};

export const WithTextarea: Story = {
  args: {
    label: "Bio",
    required: false,
    layout: "vertical",
    description: "Tell us a little bit about yourself.",
    hintText: "This will be visible on your public profile.",
    children: (
      <Textarea
        placeholder="Enter your bio..."
        className="resize-none"
        rows={4}
      />
    ),
  },
};

export const WithCheckbox: Story = {
  args: {
    label: "Terms and conditions",
    required: true,
    layout: "vertical",
    description: "You must accept our terms and conditions to continue.",
    children: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions
        </label>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    label: "Username",
    required: true,
    children: <Input placeholder="Enter username" />,
  },
};

export const WithHintOnly: Story = {
  args: {
    label: "API Key",
    required: true,
    hintText:
      "Your API key is used to authenticate requests to our services. Keep it secure and never share it publicly.",
    children: <Input placeholder="sk-..." type="password" />,
  },
};

export const MultipleFields: Story = {
  render: () => (
    <div className="space-y-6">
      <FormField
        label="First name"
        required={true}
        layout="vertical"
        description="Your given name"
      >
        <Input placeholder="John" />
      </FormField>

      <FormField
        label="Last name"
        required={true}
        layout="vertical"
        description="Your family name"
      >
        <Input placeholder="Doe" />
      </FormField>

      <FormField
        label="Email"
        required={true}
        layout="horizontal"
        description="We'll use this to contact you"
        hintText="We'll send you important updates and notifications"
      >
        <Input placeholder="john.doe@example.com" type="email" />
      </FormField>

      <FormField
        label="Role"
        required={false}
        layout="horizontal"
        description="Select your primary role"
      >
        <Select
          placeholder="Select a role"
          options={[
            { value: "admin", label: "Administrator" },
            { value: "user", label: "User" },
            { value: "viewer", label: "Viewer" },
          ]}
        />
      </FormField>
    </div>
  ),
};
