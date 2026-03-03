import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { useState } from "react";

import { CurrencyInput } from "@/design-system/currency-input";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  title: "Forms/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="space-y-2">
      <CurrencyInput currency="USD" value={value} onChange={setValue} />
    </div>
  );
};

export const Default: Story = {
  args: {} as unknown as Story["args"],
  render: DefaultComponent,
};

const WithValueComponent = () => {
  const [value, setValue] = useState(1234.56);

  return (
    <div className="space-y-2">
      <CurrencyInput currency="USD" value={value} onChange={setValue} />
    </div>
  );
};

export const WithValue: Story = {
  args: {} as unknown as Story["args"],
  render: WithValueComponent,
};

const DifferentCurrenciesComponent = () => {
  const [usd, setUsd] = useState(100);
  const [eur, setEur] = useState(100);
  const [gbp, setGbp] = useState(100);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">USD</label>
        <CurrencyInput currency="USD" value={usd} onChange={setUsd} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">EUR</label>
        <CurrencyInput currency="EUR" value={eur} onChange={setEur} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">GBP</label>
        <CurrencyInput currency="GBP" value={gbp} onChange={setGbp} />
      </div>
    </div>
  );
};

export const DifferentCurrencies: Story = {
  args: {} as unknown as Story["args"],
  render: DifferentCurrenciesComponent,
};

const InFormFieldComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <FormField label="Amount" required description="Enter the monetary value">
      <CurrencyInput currency="USD" value={value} onChange={setValue} />
    </FormField>
  );
};

export const InFormField: Story = {
  args: {} as unknown as Story["args"],
  render: InFormFieldComponent,
};

const WithMinMaxComponent = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-2">
      <CurrencyInput
        currency="USD"
        value={value}
        onChange={setValue}
        minValue={0}
        maxValue={100}
      />
      <p className="text-sm text-muted-foreground">Min: $0, Max: $100</p>
    </div>
  );
};

export const WithMinMax: Story = {
  args: {} as unknown as Story["args"],
  render: WithMinMaxComponent,
};

const DisabledComponent = () => {
  const [value, setValue] = useState(123.45);

  return (
    <CurrencyInput currency="USD" value={value} onChange={setValue} disabled />
  );
};

export const Disabled: Story = {
  args: {} as unknown as Story["args"],
  render: DisabledComponent,
};

const CustomPlaceholderComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <CurrencyInput
      currency="USD"
      value={value}
      onChange={setValue}
      placeholder="Enter amount"
    />
  );
};

export const CustomPlaceholder: Story = {
  args: {} as unknown as Story["args"],
  render: CustomPlaceholderComponent,
};
