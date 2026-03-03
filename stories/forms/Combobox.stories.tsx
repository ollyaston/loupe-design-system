import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Combobox } from "@/design-system/combobox";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Combobox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const roles = [
  { value: "admin", label: "Administrator" },
  { value: "user", label: "User" },
  { value: "viewer", label: "Viewer" },
  { value: "moderator", label: "Moderator" },
];

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
  },
  render: (args) => (
    <FormField label="Framework" required>
      <Combobox {...args} />
    </FormField>
  ),
};

export const WithDescription: Story = {
  args: {
    options: countries,
    placeholder: "Select country...",
    searchPlaceholder: "Search country...",
    emptyText: "No country found.",
  },
  render: (args) => (
    <FormField
      label="Country"
      required
      description="Choose your country for region-specific features"
    >
      <Combobox {...args} />
    </FormField>
  ),
};

export const WithHint: Story = {
  args: {
    options: roles,
    placeholder: "Select role...",
    searchPlaceholder: "Search role...",
    emptyText: "No role found.",
  },
  render: (args) => (
    <FormField
      label="Role"
      required
      hintText="This determines your access level and permissions in the system"
    >
      <Combobox {...args} />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
  },
  render: (args) => (
    <FormField
      label="Framework"
      required
      layout="horizontal"
      description="Choose the framework you're most familiar with"
    >
      <Combobox {...args} />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    placeholder: "Disabled combobox",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
    disabled: true,
  },
  render: (args) => (
    <FormField
      label="Disabled field"
      description="This field is currently disabled"
    >
      <Combobox {...args} />
    </FormField>
  ),
};

export const WithValue: Story = {
  args: {
    options: frameworks,
    value: "next.js",
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
  },
  render: (args) => (
    <FormField label="Framework" required>
      <Combobox {...args} />
    </FormField>
  ),
};

export const Controlled: Story = {
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
  },
  render: (args) => {
    const [value, setValue] = React.useState("");

    return (
      <FormField label="Controlled combobox" required>
        <Combobox {...args} value={value} onValueChange={setValue} />
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {value || "None"}
        </div>
      </FormField>
    );
  },
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
    placeholder: "Select language...",
    searchPlaceholder: "Search language...",
    emptyText: "No language found.",
  },
  render: (args) => (
    <FormField
      label="Programming language"
      required
      description="Select your primary programming language"
    >
      <Combobox {...args} />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
    error: true,
  },
  render: (args) => (
    <FormField
      label="Framework"
      required
      description="Please select a valid framework"
    >
      <Combobox {...args} />
    </FormField>
  ),
};

export const CustomStyling: Story = {
  args: {
    options: frameworks,
    placeholder: "Select framework...",
    searchPlaceholder: "Search framework...",
    emptyText: "No framework found.",
    triggerClassName: "border-2 border-primary",
    contentClassName: "w-80",
  },
  render: (args) => (
    <FormField label="Custom styled combobox" required>
      <Combobox {...args} />
    </FormField>
  ),
};
