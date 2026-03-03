import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StepBadge } from "@/design-system/step-badge";
import { Container } from "@/components/layouts/container";

const meta = {
  component: StepBadge,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof StepBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 1,
    completed: false,
    size: "default",
  },
};

export const Completed: Story = {
  args: {
    index: 1,
    completed: true,
    size: "default",
  },
};

export const Small: Story = {
  args: {
    index: 2,
    completed: false,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    index: 3,
    completed: false,
    size: "lg",
  },
};

export const Active: Story = {
  args: {
    index: 1,
    completed: false,
    active: true,
    size: "default",
  },
};

export const ActiveSmall: Story = {
  args: {
    index: 2,
    completed: false,
    active: true,
    size: "sm",
  },
};

export const ActiveLarge: Story = {
  args: {
    index: 3,
    completed: false,
    active: true,
    size: "lg",
  },
};

export const AllSizes: Story = {
  args: {
    index: 1,
    completed: false,
    size: "default",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <StepBadge index={1} completed={false} size="sm" />
      <StepBadge index={2} completed={true} size="sm" />
      <StepBadge index={3} completed={false} size="default" />
      <StepBadge index={4} completed={true} size="default" />
      <StepBadge index={5} completed={false} size="lg" />
      <StepBadge index={6} completed={true} size="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  args: {
    index: 1,
    completed: false,
    size: "default",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <StepBadge index={1} completed={false} active={false} size="default" />
      <StepBadge index={2} completed={false} active={true} size="default" />
      <StepBadge index={3} completed={true} active={false} size="default" />
    </div>
  ),
};
