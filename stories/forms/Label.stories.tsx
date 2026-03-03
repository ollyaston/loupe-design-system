import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/design-system/label";
import { Input } from "@/design-system/input";
import { Checkbox } from "@/design-system/checkbox";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Label,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Enter your name" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input type="tel" id="phone" placeholder="Enter your phone number" />
      </div>
    </div>
  ),
};
