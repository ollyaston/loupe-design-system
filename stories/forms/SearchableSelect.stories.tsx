import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SearchableSelect } from "@/design-system/searchable-select";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: SearchableSelect,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof SearchableSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/* eslint-disable agent-loupe-ui/sentence-case */
const customers = [
  { value: "1", label: "Acme Corp", data: { email: "billing@acme.com" } },
  { value: "2", label: "Globex Inc", data: { email: "accounts@globex.com" } },
  {
    value: "3",
    label: "Stark Industries",
    data: { email: "finance@stark.com" },
  },
  { value: "4", label: "Wayne Enterprises", data: { email: "ap@wayne.com" } },
  {
    value: "5",
    label: "Umbrella Corp",
    data: { email: "billing@umbrella.co" },
  },
];
/* eslint-enable agent-loupe-ui/sentence-case */

const products = [
  { value: "pro", label: "Pro plan" },
  { value: "team", label: "Team plan" },
  { value: "enterprise", label: "Enterprise plan" },
  { value: "starter", label: "Starter plan" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "au", label: "Australia" },
];

export const Default: Story = {
  args: {
    options: products,
    placeholder: "Select a plan...",
    searchPlaceholder: "Search plans...",
    emptyText: "No plan found.",
  },
  render: (args) => (
    <FormField label="Plan" required>
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const WithDescription: Story = {
  args: {
    options: countries,
    placeholder: "Select a country...",
    searchPlaceholder: "Search countries...",
    emptyText: "No country found.",
  },
  render: (args) => (
    <FormField
      label="Country"
      required
      description="Select your billing country"
    >
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const CustomRenderTriggerAndOption: Story = {
  args: {
    options: customers,
    placeholder: "Select a customer...",
    searchPlaceholder: "Search customers...",
    emptyText: "No customer found.",
    renderTrigger: (option) => (
      <div className="flex flex-col items-start">
        <span>{option.label}</span>
        <span className="text-xs text-muted-foreground">
          {(option.data as { email: string })?.email}
        </span>
      </div>
    ),
    renderOption: (option) => (
      <div className="flex flex-col">
        <span>{option.label}</span>
        <span className="text-xs text-muted-foreground">
          {(option.data as { email: string })?.email}
        </span>
      </div>
    ),
  },
  render: (args) => (
    <FormField label="Customer" required>
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const Controlled: Story = {
  args: {
    options: products,
    placeholder: "Select a plan...",
    searchPlaceholder: "Search plans...",
    emptyText: "No plan found.",
  },
  render: (args) => {
    const [value, setValue] = React.useState<string | undefined>();

    return (
      <FormField label="Controlled select" required>
        <SearchableSelect {...args} value={value} onValueChange={setValue} />
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {value || "None"}
        </div>
      </FormField>
    );
  },
};

export const PreSelected: Story = {
  args: {
    options: products,
    value: "team",
    placeholder: "Select a plan...",
    searchPlaceholder: "Search plans...",
    emptyText: "No plan found.",
  },
  render: (args) => (
    <FormField label="Pre-selected plan" required>
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    options: products,
    placeholder: "Disabled select",
    searchPlaceholder: "Search plans...",
    emptyText: "No plan found.",
    disabled: true,
  },
  render: (args) => (
    <FormField
      label="Disabled field"
      description="This field is currently disabled"
    >
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    options: products,
    placeholder: "Select a plan...",
    searchPlaceholder: "Search plans...",
    emptyText: "No plan found.",
    error: true,
  },
  render: (args) => (
    <FormField label="Plan" required description="A plan selection is required">
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const LongList: Story = {
  args: {
    options: [
      { value: "1", label: "Customer 1" },
      { value: "2", label: "Customer 2" },
      { value: "3", label: "Customer 3" },
      { value: "4", label: "Customer 4" },
      { value: "5", label: "Customer 5" },
      { value: "6", label: "Customer 6" },
      { value: "7", label: "Customer 7" },
      { value: "8", label: "Customer 8" },
      { value: "9", label: "Customer 9" },
      { value: "10", label: "Customer 10" },
      { value: "11", label: "Customer 11" },
      { value: "12", label: "Customer 12" },
      { value: "13", label: "Customer 13" },
      { value: "14", label: "Customer 14" },
      { value: "15", label: "Customer 15" },
    ],
    placeholder: "Select a customer...",
    searchPlaceholder: "Search customers...",
    emptyText: "No customer found.",
  },
  render: (args) => (
    <FormField
      label="Customers"
      required
      description="Search is helpful with long lists"
    >
      <SearchableSelect {...args} />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  args: {
    options: products,
    placeholder: "Select a plan...",
    searchPlaceholder: "Search plans...",
    emptyText: "No plan found.",
  },
  render: (args) => (
    <FormField
      label="Plan"
      required
      layout="horizontal"
      description="Choose your subscription plan"
    >
      <SearchableSelect {...args} />
    </FormField>
  ),
};
