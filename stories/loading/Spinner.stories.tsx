import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from "@/design-system/spinner";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number" },
    },
    spinning: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
  },
};

export const Small: Story = {
  args: {
    size: 16,
  },
};

export const Large: Story = {
  args: {
    size: 32,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 48,
  },
};

export const Static: Story = {
  args: {
    size: 24,
    spinning: false,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner size={16} />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={24} />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={32} />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={48} />
        <span className="text-xs text-muted-foreground">Extra large</span>
      </div>
    </div>
  ),
};

export const SpinningVsStatic: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size={24} spinning={true} />
        <span className="text-xs text-muted-foreground">Spinning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={24} spinning={false} />
        <span className="text-xs text-muted-foreground">Static</span>
      </div>
    </div>
  ),
};
