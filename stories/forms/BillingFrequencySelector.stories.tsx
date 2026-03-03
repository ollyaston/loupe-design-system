import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BillingFrequencySelector } from "../../design-system/billing-frequency-selector";
import { Container } from "@/components/layouts/container";
import { useState } from "react";

const meta: Meta<typeof BillingFrequencySelector> = {
  component: BillingFrequencySelector,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    value: {
      control: "select",
      options: ["monthly", "quarterly", "semi-annually", "yearly", "custom"],
    },
    size: {
      control: "select",
      options: ["default", "full", "half", "quarter"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BillingFrequencySelector>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("monthly");
    return (
      <BillingFrequencySelector
        {...args}
        value={value}
        onValueChange={setValue}
      />
    );
  },
  args: {
    value: "monthly",
  },
};

export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = useState("monthly");
    const [value2, setValue2] = useState("quarterly");
    const [value3, setValue3] = useState("yearly");

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Default Size (50% width)</h3>
          <BillingFrequencySelector value={value1} onValueChange={setValue1} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Full width</h3>
          <BillingFrequencySelector
            value={value2}
            onValueChange={setValue2}
            size="full"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Quarter width</h3>
          <BillingFrequencySelector
            value={value3}
            onValueChange={setValue3}
            size="quarter"
          />
        </div>
      </div>
    );
  },
};

export const WithCustomLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState("monthly");
    return (
      <BillingFrequencySelector
        {...args}
        value={value}
        onValueChange={setValue}
        label="Payment frequency"
        placeholder="Select payment frequency"
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState("monthly");
    return (
      <BillingFrequencySelector
        {...args}
        value={value}
        onValueChange={setValue}
        disabled
      />
    );
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState("monthly");
    return (
      <BillingFrequencySelector
        {...args}
        value={value}
        onValueChange={setValue}
        required
      />
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("monthly");
    const [customMonths, setCustomMonths] = useState(3);

    return (
      <div className="space-y-4">
        <BillingFrequencySelector
          value={value}
          onValueChange={setValue}
          customMonths={customMonths}
          onCustomMonthsChange={setCustomMonths}
          label="Billing frequency"
        />
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-medium">{value}</span>
          {value === "custom" && <span> ({customMonths} months)</span>}
        </div>
      </div>
    );
  },
};

export const CustomMonths: Story = {
  render: () => {
    const [value, setValue] = useState("custom");
    const [customMonths, setCustomMonths] = useState(6);

    return (
      <div className="space-y-4">
        <BillingFrequencySelector
          value={value}
          onValueChange={setValue}
          customMonths={customMonths}
          onCustomMonthsChange={setCustomMonths}
          label="Billing frequency"
        />
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-medium">{value}</span>
          <span> ({customMonths} months)</span>
        </div>
      </div>
    );
  },
};
