import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { useState } from "react";

import { SelectWithCustomOption } from "@/design-system/select-with-custom-option";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  title: "Forms/SelectWithCustomOption",
  component: SelectWithCustomOption,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4 h-96">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof SelectWithCustomOption>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [value, setValue] = useState("monthly");
  const [customValue, setCustomValue] = useState<number | undefined>();

  return (
    <SelectWithCustomOption
      value={value}
      customValue={customValue}
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "yearly", label: "Yearly" },
        { value: "custom", label: "Custom" },
      ]}
      onValueChange={(val, custom) => {
        setValue(val);
        setCustomValue(custom);
      }}
    />
  );
};

export const Default: Story = {
  args: {} as unknown as Story["args"],
  render: DefaultComponent,
};

const WithCustomSelectedComponent = () => {
  const [value, setValue] = useState("custom");
  const [customValue, setCustomValue] = useState<number | undefined>(6);

  return (
    <SelectWithCustomOption
      value={value}
      customValue={customValue}
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "yearly", label: "Yearly" },
        { value: "custom", label: "Custom" },
      ]}
      onValueChange={(val, custom) => {
        setValue(val);
        setCustomValue(custom);
      }}
    />
  );
};

export const WithCustomSelected: Story = {
  args: {} as unknown as Story["args"],
  render: WithCustomSelectedComponent,
};

const InFormFieldComponent = () => {
  const [value, setValue] = useState("monthly");
  const [customValue, setCustomValue] = useState<number | undefined>();

  return (
    <FormField
      label="Billing frequency"
      required
      description="Select how often you want to be billed"
    >
      <SelectWithCustomOption
        value={value}
        customValue={customValue}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "yearly", label: "Yearly" },
          { value: "custom", label: "Custom" },
        ]}
        onValueChange={(val, custom) => {
          setValue(val);
          setCustomValue(custom);
        }}
      />
    </FormField>
  );
};

export const InFormField: Story = {
  args: {} as unknown as Story["args"],
  render: InFormFieldComponent,
};

const CustomLabelsComponent = () => {
  const [value, setValue] = useState("daily");
  const [customValue, setCustomValue] = useState<number | undefined>();

  return (
    <SelectWithCustomOption
      value={value}
      customValue={customValue}
      options={[
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "custom", label: "Custom interval" },
      ]}
      customOptionValue="custom"
      customInputLabel="Enter custom interval"
      customInputPlaceholder="e.g., 3"
      customInputSuffix="day(s)"
      customDisplayFormat={(val) => `Every ${val} day${val === 1 ? "" : "s"}`}
      onValueChange={(val, custom) => {
        setValue(val);
        setCustomValue(custom);
      }}
    />
  );
};

export const CustomLabels: Story = {
  args: {} as unknown as Story["args"],
  render: CustomLabelsComponent,
};

const DisabledComponent = () => {
  const [value, setValue] = useState("monthly");
  const [customValue, setCustomValue] = useState<number | undefined>();

  return (
    <SelectWithCustomOption
      value={value}
      customValue={customValue}
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "yearly", label: "Yearly" },
        { value: "custom", label: "Custom" },
      ]}
      onValueChange={(val, custom) => {
        setValue(val);
        setCustomValue(custom);
      }}
      disabled
    />
  );
};

export const Disabled: Story = {
  args: {} as unknown as Story["args"],
  render: DisabledComponent,
};
