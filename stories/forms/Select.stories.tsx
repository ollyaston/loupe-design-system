import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Select } from "@/design-system/select";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";
import { Badge } from "@/design-system/badge";

const meta = {
  component: Select,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select a fruit",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "blueberry", label: "Blueberry" },
      { value: "grapes", label: "Grapes" },
      { value: "pineapple", label: "Pineapple" },
    ],
  },
  render: (args) => (
    <FormField label="Favorite fruit" required>
      <Select {...args} />
    </FormField>
  ),
};

export const WithDescription: Story = {
  args: {
    placeholder: "Select a framework",
    options: [
      { value: "next", label: "Next.js" },
      { value: "sveltekit", label: "SvelteKit" },
      { value: "astro", label: "Astro" },
      { value: "nuxt", label: "Nuxt.js" },
    ],
  },
  render: (args) => (
    <FormField
      label="Framework"
      required
      description="Choose the framework you're most familiar with"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const WithHint: Story = {
  args: {
    placeholder: "Select a country",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
      { value: "uk", label: "United Kingdom" },
    ],
  },
  render: (args) => (
    <FormField
      label="Country"
      required
      hintText="This helps us provide region-specific features and compliance requirements"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  args: {
    placeholder: "Select a role",
    options: [
      { value: "admin", label: "Administrator" },
      { value: "user", label: "User" },
      { value: "viewer", label: "Viewer" },
      { value: "moderator", label: "Moderator" },
    ],
  },
  render: (args) => (
    <FormField
      label="Role"
      required
      layout="horizontal"
      description="Select your primary role in the organization"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
    disabled: true,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
  render: (args) => (
    <FormField
      label="Disabled field"
      description="This field is currently disabled"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    placeholder: "Select a country",
    error: true,
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
      { value: "uk", label: "United Kingdom" },
    ],
  },
  render: (args) => (
    <FormField
      label="Country"
      required
      description="Please select a valid country"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const WithJSXLabels: Story = {
  args: {
    placeholder: "Select a status",
    options: [
      {
        value: "live",
        label: (
          <div className="flex items-center justify-between w-full gap-2">
            <span>Live</span>
            <Badge variant="outline" contentType="numbers">
              12
            </Badge>
          </div>
        ),
      },
      {
        value: "draft",
        label: (
          <div className="flex items-center justify-between w-full gap-2">
            <span>Draft</span>
            <Badge variant="outline" contentType="numbers">
              5
            </Badge>
          </div>
        ),
      },
      {
        value: "archived",
        label: (
          <div className="flex items-center justify-between w-full gap-2">
            <span>Archived</span>
            <Badge variant="outline" contentType="numbers">
              3
            </Badge>
          </div>
        ),
      },
    ],
  },
  render: (args) => (
    <FormField
      label="Status"
      required
      description="Select a status with JSX labels including badges"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const WithJSXLabelsAndIcons: Story = {
  args: {
    placeholder: "Select a product",
    options: [
      {
        value: "product1",
        label: (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Product A</span>
            <Badge variant="outline" className="text-xs">
              ACTIVE
            </Badge>
          </div>
        ),
      },
      {
        value: "product2",
        label: (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>Product B</span>
            <Badge variant="outline" className="text-xs">
              DRAFT
            </Badge>
          </div>
        ),
      },
      {
        value: "product3",
        label: (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-muted" />
            <span>Product C</span>
            <Badge variant="outline" className="text-xs">
              ARCHIVED
            </Badge>
          </div>
        ),
      },
    ],
  },
  render: (args) => (
    <FormField
      label="Product"
      required
      description="Select a product with JSX labels including status indicators and badges"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const Required: Story = {
  args: {
    placeholder: "Select a credit currency",
    required: true,
    options: [
      { value: "credits-1", label: "API Credits (api-credits)" },
      { value: "credits-2", label: "Processing Credits (proc-credits)" },
      { value: "credits-3", label: "Storage Credits (storage-credits)" },
    ],
  },
  render: (args) => (
    <FormField
      label="Credit currency"
      required
      description="Select the type of credits this bundle will grant to customers"
    >
      <Select {...args} />
    </FormField>
  ),
};

export const HugContents: Story = {
  args: {
    placeholder: "Select unit",
    hugContents: true,
    options: [
      { value: "minutes", label: "Minutes" },
      { value: "hours", label: "Hours" },
      { value: "days", label: "Days" },
    ],
  },
  render: (args) => (
    <div className="space-y-4">
      <FormField
        label="Hug contents (compact)"
        description="The select width adapts to its content instead of using a fixed width"
      >
        <Select {...args} />
      </FormField>
      <FormField
        label="Default width (200px)"
        description="The select uses a fixed width of 200px"
      >
        <Select {...args} hugContents={false} />
      </FormField>
    </div>
  ),
};
