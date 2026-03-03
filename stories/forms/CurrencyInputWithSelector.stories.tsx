import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { useState } from "react";

import { CurrencyInputWithSelector } from "@/design-system/currency-input-with-selector";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";
import { CURRENCIES } from "@/lib/currency";

const CURRENCY_CODES = Object.keys(CURRENCIES) as Array<
  keyof typeof CURRENCIES
>;

const meta = {
  component: CurrencyInputWithSelector,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CurrencyInputWithSelector>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
  render: () => React.JSX.Element;
};

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState("USD");

    return (
      <CurrencyInputWithSelector
        value={value}
        onChange={setValue}
        currency={currency as any}
        currencies={CURRENCY_CODES}
        onCurrencyChange={setCurrency}
      />
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState(1234.56);
    const [currency, setCurrency] = useState("USD");

    return (
      <CurrencyInputWithSelector
        value={value}
        onChange={setValue}
        currency={currency as any}
        currencies={CURRENCY_CODES}
        onCurrencyChange={setCurrency}
      />
    );
  },
};

export const InFormField: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState("USD");

    return (
      <FormField
        label="Price"
        required
        description="Enter the price for this item"
      >
        <CurrencyInputWithSelector
          value={value}
          onChange={setValue}
          currency={currency as any}
          currencies={CURRENCY_CODES}
          onCurrencyChange={setCurrency}
        />
      </FormField>
    );
  },
};

export const WithLargeValue: Story = {
  render: () => {
    const [value, setValue] = useState(1234567.89);
    const [currency, setCurrency] = useState("USD");

    return (
      <CurrencyInputWithSelector
        value={value}
        onChange={setValue}
        currency={currency as any}
        currencies={CURRENCY_CODES}
        onCurrencyChange={setCurrency}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(1000);
    const [currency, setCurrency] = useState("USD");

    return (
      <CurrencyInputWithSelector
        value={value}
        onChange={setValue}
        currency={currency as any}
        currencies={CURRENCY_CODES}
        onCurrencyChange={setCurrency}
        disabled
      />
    );
  },
};

export const DifferentCurrencies: Story = {
  render: () => {
    const [usdValue, setUsdValue] = useState(1000);
    const [eurValue, setEurValue] = useState(1000);
    const [gbpValue, setGbpValue] = useState(1000);
    const [brlValue, setBrlValue] = useState(1000);

    return (
      <div className="space-y-4">
        <CurrencyInputWithSelector
          value={usdValue}
          onChange={setUsdValue}
          currency="USD"
          currencies={CURRENCY_CODES}
          onCurrencyChange={() => {}}
        />
        <CurrencyInputWithSelector
          value={eurValue}
          onChange={setEurValue}
          currency="EUR"
          currencies={CURRENCY_CODES}
          onCurrencyChange={() => {}}
        />
        <CurrencyInputWithSelector
          value={gbpValue}
          onChange={setGbpValue}
          currency="GBP"
          currencies={CURRENCY_CODES}
          onCurrencyChange={() => {}}
        />
        <CurrencyInputWithSelector
          value={brlValue}
          onChange={setBrlValue}
          currency="BRL"
          currencies={CURRENCY_CODES}
          onCurrencyChange={() => {}}
        />
      </div>
    );
  },
};
