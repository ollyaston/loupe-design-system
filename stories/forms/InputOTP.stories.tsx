import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InputOTP } from "@/design-system/input-otp";
import { Container } from "@/components/layouts/container";

const meta = {
  title: "Forms/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    length: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of OTP input slots",
    },
    showSeparator: {
      control: { type: "boolean" },
      description: "Whether to show a separator between groups",
    },
    separatorPosition: {
      control: { type: "number", min: 1, max: 9 },
      description: "Position where the separator should appear (0-based index)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 6,
    maxLength: 6,
  },
};

export const FourDigits: Story = {
  args: {
    length: 4,
    maxLength: 4,
  },
};

export const WithSeparator: Story = {
  args: {
    length: 8,
    maxLength: 8,
    showSeparator: true,
    separatorPosition: 4,
  },
};

export const Disabled: Story = {
  args: {
    length: 6,
    maxLength: 6,
    showSeparator: true,
    disabled: true,
  },
};
