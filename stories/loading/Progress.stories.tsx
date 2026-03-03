import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Progress } from "@/design-system/progress";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Progress> = {
  component: Progress,
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
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The progress value (0-100)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const CustomColors: Story = {
  args: {
    value: 80,
    className: "bg-destructive/20 [&>div]:bg-destructive",
  },
};

export const Interactive: Story = {
  args: {
    value: 0,
  },
  render: (args) => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-64">
        <Progress value={value} {...args} />
        <p className="mt-2 text-sm text-muted-foreground">Progress: {value}%</p>
      </div>
    );
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Upload progress</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Download progress</span>
          <span>45%</span>
        </div>
        <Progress value={45} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Installation progress</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};
