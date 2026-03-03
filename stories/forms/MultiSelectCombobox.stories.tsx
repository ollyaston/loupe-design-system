import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MultiSelectCombobox } from "@/design-system/multi-select-combobox";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: MultiSelectCombobox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof MultiSelectCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// eslint-disable agent-loupe-ui/sentence-case
const contacts = [
  { value: "1", label: "John Doe" },
  { value: "2", label: "Jane Smith" },
  { value: "3", label: "Bob Johnson" },
  { value: "4", label: "John Doe" },
  { value: "5", label: "Jane Smith" },
  { value: "6", label: "Bob Johnson" },
  { value: "7", label: "John Doe" },
  { value: "8", label: "Jane Smith" },
];
// eslint-enable agent-loupe-ui/sentence-case

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
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
    options: contacts,
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
  },
  render: (args) => (
    <FormField label="Billing contacts" required>
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const WithDescription: Story = {
  args: {
    options: countries,
    placeholder: "Select countries...",
    searchPlaceholder: "Search countries...",
    emptyText: "No country found.",
  },
  render: (args) => (
    <FormField
      label="Countries"
      required
      description="Select all countries where you operate"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const WithHint: Story = {
  args: {
    options: frameworks,
    placeholder: "Select frameworks...",
    searchPlaceholder: "Search frameworks...",
    emptyText: "No framework found.",
  },
  render: (args) => (
    <FormField
      label="Frameworks"
      required
      hintText="Select all frameworks your team is familiar with"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  args: {
    options: contacts,
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
  },
  render: (args) => (
    <FormField
      label="Team members"
      required
      layout="horizontal"
      description="Choose multiple team members for this project"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    options: contacts,
    placeholder: "Disabled multi-select",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
    disabled: true,
  },
  render: (args) => (
    <FormField
      label="Disabled field"
      description="This field is currently disabled"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const WithValues: Story = {
  args: {
    options: contacts,
    values: ["1", "3", "5"],
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
  },
  render: (args) => (
    <FormField label="Pre-selected contacts" required>
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const Controlled: Story = {
  args: {
    options: contacts,
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
  },
  render: (args) => {
    const [values, setValues] = React.useState<string[]>([]);

    return (
      <FormField label="Controlled multi-select" required>
        <MultiSelectCombobox
          {...args}
          values={values}
          onValuesChange={setValues}
        />
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {values.length > 0 ? values.join(", ") : "None"}
        </div>
      </FormField>
    );
  },
};

export const MaxDisplayCustom: Story = {
  args: {
    options: contacts,
    values: ["1", "2", "3", "4"],
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
    maxDisplay: 1,
  },
  render: (args) => (
    <FormField
      label="Many contacts"
      required
      description="Shows count badge when more than 1 selected"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const LongList: Story = {
  args: {
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "csharp", label: "C#" },
      { value: "cpp", label: "C++" },
      { value: "c", label: "C" },
      { value: "php", label: "PHP" },
      { value: "ruby", label: "Ruby" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
      { value: "swift", label: "Swift" },
      { value: "kotlin", label: "Kotlin" },
      { value: "scala", label: "Scala" },
      { value: "r", label: "R" },
      { value: "matlab", label: "MATLAB" },
      { value: "perl", label: "Perl" },
      { value: "haskell", label: "Haskell" },
      { value: "clojure", label: "Clojure" },
      { value: "elixir", label: "Elixir" },
    ],
    placeholder: "Select languages...",
    searchPlaceholder: "Search languages...",
    emptyText: "No language found.",
  },
  render: (args) => (
    <FormField
      label="Programming languages"
      required
      description="Select all languages you're proficient in"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    options: contacts,
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
    error: true,
  },
  render: (args) => (
    <FormField
      label="Billing contacts"
      required
      description="At least one contact is required"
    >
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};

export const CustomStyling: Story = {
  args: {
    options: contacts,
    placeholder: "Select contacts...",
    searchPlaceholder: "Search contacts...",
    emptyText: "No contact found.",
    triggerClassName: "border-2 border-primary",
    contentClassName: "w-96",
  },
  render: (args) => (
    <FormField label="Custom styled multi-select" required>
      <MultiSelectCombobox {...args} />
    </FormField>
  ),
};
