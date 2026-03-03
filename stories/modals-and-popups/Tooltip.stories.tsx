import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tooltip } from "@/design-system/tooltip";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";
import { Kbd } from "@/design-system/shadcn-io/kbd";

const meta = {
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
    content: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A tooltip component that shows helpful information on hover.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button variant="outline">Hover me</Button>,
    content: <p>This is a tooltip</p>,
  },
};

export const Top: Story = {
  args: {
    children: <Button variant="outline">Top</Button>,
    content: <p>Tooltip on top</p>,
    side: "top",
  },
};

export const Right: Story = {
  args: {
    children: <Button variant="outline">Right</Button>,
    content: <p>Tooltip on right</p>,
    side: "right",
  },
};

export const Bottom: Story = {
  args: {
    children: <Button variant="outline">Bottom</Button>,
    content: <p>Tooltip on bottom</p>,
    side: "bottom",
  },
};

export const Left: Story = {
  args: {
    children: <Button variant="outline">Left</Button>,
    content: <p>Tooltip on left</p>,
    side: "left",
  },
};

export const KeyboardShortcut: Story = {
  args: {
    children: <Kbd className="cursor-help">Ctrl + K</Kbd>,
    content: <p>Open command palette</p>,
  },
};
