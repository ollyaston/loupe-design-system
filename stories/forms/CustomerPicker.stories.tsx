import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { CustomerPicker } from "@/design-system/customer-picker";
import { Container } from "@/components/layouts/container";
import { FormField } from "@/design-system/form-field";

/* eslint-disable agent-loupe-ui/sentence-case */
const mockCustomers = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "billing@acme.com",
    externalId: "CUST-001",
  },
  {
    id: "2",
    name: "TechStart Inc",
    email: "accounts@techstart.io",
    externalId: "CUST-002",
  },
  {
    id: "3",
    name: "Global Solutions Ltd",
    email: "finance@globalsolutions.co",
    externalId: "CUST-003",
  },
  {
    id: "4",
    name: "Innovate Labs",
    email: "billing@innovatelabs.dev",
    externalId: "CUST-004",
  },
  {
    id: "5",
    name: "Digital Dynamics",
    email: "ap@digitaldynamics.com",
    externalId: "CUST-005",
  },
];
/* eslint-enable agent-loupe-ui/sentence-case */

const meta: Meta<typeof CustomerPicker> = {
  component: CustomerPicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4 max-w-md">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when no customer is selected",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    emptyText: {
      control: "text",
      description: "Text shown when no customers match the search",
    },
    secondaryText: {
      control: "select",
      options: ["email", "externalId", "none"],
      description: "Which field to show as secondary text",
    },
    addNewLabel: {
      control: "text",
      description: "Label for the 'Add new customer' option",
    },
    disabled: {
      control: "boolean",
      description: "Whether the picker is disabled",
    },
    error: {
      control: "boolean",
      description: "Whether to show an error state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerPicker>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <FormField label="Customer" required>
        <CustomerPicker
          {...args}
          customers={mockCustomers}
          value={value}
          onValueChange={setValue}
        />
      </FormField>
    );
  },
  args: {
    placeholder: "Select a customer...",
    searchPlaceholder: "Search customers...",
    secondaryText: "email",
  },
};

export const WithExternalId: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <CustomerPicker
        {...args}
        customers={mockCustomers}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    secondaryText: "externalId",
  },
};

export const NoSecondaryText: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <CustomerPicker
        {...args}
        customers={mockCustomers}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    secondaryText: "none",
  },
};

export const WithAddNewHandler: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <CustomerPicker
        {...args}
        customers={mockCustomers}
        value={value}
        onValueChange={setValue}
        onAddNew={() => alert("Add new customer clicked!")}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    secondaryText: "email",
    addNewLabel: "Add new customer",
  },
};

export const PreSelected: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("2");
    return (
      <CustomerPicker
        {...args}
        customers={mockCustomers}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    secondaryText: "email",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("1");
    return (
      <CustomerPicker
        {...args}
        customers={mockCustomers}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    secondaryText: "email",
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <CustomerPicker
        {...args}
        customers={mockCustomers}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    secondaryText: "email",
    error: true,
  },
};

export const EmptyState: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <CustomerPicker
        {...args}
        customers={[]}
        value={value}
        onValueChange={setValue}
        onAddNew={() => alert("Add new customer clicked!")}
      />
    );
  },
  args: {
    placeholder: "Select a customer...",
    emptyText: "No results found.",
  },
};
