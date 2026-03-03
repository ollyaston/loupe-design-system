import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HoldButton } from "@/design-system/hold-button";
import { Container } from "@/components/layouts/container";

const meta = {
  title: "Buttons/HoldButton",
  component: HoldButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    holdDuration: {
      control: "number",
      description: "Duration in milliseconds to hold before triggering",
    },
  },
  args: {
    onComplete: () => console.log("Hold complete"),
  },
} satisfies Meta<typeof HoldButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hold to confirm",
    variant: "default",
    holdDuration: 1500,
  },
};

export const Destructive: Story = {
  args: {
    children: "Hold to delete",
    variant: "destructive",
    holdDuration: 1500,
  },
};

export const ShortDuration: Story = {
  args: {
    children: "Hold (1s)",
    variant: "default",
    holdDuration: 1000,
  },
};

export const LongDuration: Story = {
  args: {
    children: "Hold (3s)",
    variant: "default",
    holdDuration: 3000,
  },
};

export const Disabled: Story = {
  args: {
    children: "Hold to confirm",
    variant: "default",
    disabled: true,
    holdDuration: 1500,
  },
};

export const Secondary: Story = {
  args: {
    children: "Hold to submit",
    variant: "secondary",
    holdDuration: 1500,
  },
};
