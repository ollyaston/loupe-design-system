import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  AddressInput,
  type AddressValue,
  type AddressErrors,
} from "@/design-system/address-input";
import { Container } from "@/components/layouts/container";

const meta = {
  component: AddressInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4 max-w-md">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof AddressInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: {},
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = React.useState<AddressValue>(args.value);

    return <AddressInput {...args} value={value} onChange={setValue} />;
  },
};

export const WithValues: Story = {
  args: {
    value: {
      country: "US",
      line1: "123 Main Street",
      line2: "Suite 100",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
    },
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = React.useState<AddressValue>(args.value);

    return <AddressInput {...args} value={value} onChange={setValue} />;
  },
};

export const WithErrors: Story = {
  args: {
    value: {
      country: "",
      line1: "",
      city: "",
    },
    onChange: () => {},
    errors: {
      country: "Country is required",
      line1: "Address line 1 is required",
      city: "City is required",
    },
  },
  render: (args) => {
    const [value, setValue] = React.useState<AddressValue>(args.value);
    const [errors, setErrors] = React.useState<AddressErrors>(
      args.errors || {},
    );

    const handleErrorClear = (field: keyof AddressErrors) => {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    return (
      <AddressInput
        {...args}
        value={value}
        onChange={setValue}
        errors={errors}
        onErrorClear={handleErrorClear}
      />
    );
  },
};

export const CustomLabel: Story = {
  args: {
    value: {},
    onChange: () => {},
    label: "Shipping address",
  },
  render: (args) => {
    const [value, setValue] = React.useState<AddressValue>(args.value);

    return <AddressInput {...args} value={value} onChange={setValue} />;
  },
};

export const NoLabel: Story = {
  args: {
    value: {},
    onChange: () => {},
    label: "",
  },
  render: (args) => {
    const [value, setValue] = React.useState<AddressValue>(args.value);

    return <AddressInput {...args} value={value} onChange={setValue} />;
  },
};
