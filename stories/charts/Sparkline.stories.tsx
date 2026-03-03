import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Sparkline } from "../../design-system/highchart";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Sparkline> = {
  component: Sparkline,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    data: {
      control: "object",
      description: "Array of numbers to display as a sparkline chart",
    },
    color: {
      control: "color",
      description: "Color for the sparkline line and gradient",
    },
    width: {
      control: "number",
      description: "Width of the sparkline chart",
    },
    height: {
      control: "number",
      description: "Height of the sparkline chart",
    },
    shading: {
      control: "boolean",
      description: "Toggle gradient fill under the chart",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {
  args: {
    data: [
      1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900, 2200,
    ],
    color: "#3b82f6",
    width: 100,
  },
};

export const UpwardTrend: Story = {
  args: {
    data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
    color: "#10b981",
    width: 100,
  },
};

export const DownwardTrend: Story = {
  args: {
    data: [320, 300, 280, 260, 240, 220, 200, 180, 160, 140, 120, 100],
    color: "#ef4444",
    width: 100,
  },
};

export const VolatileData: Story = {
  args: {
    data: [100, 200, 50, 300, 150, 250, 75, 350, 125, 275, 90, 325],
    color: "#f59e0b",
    width: 100,
  },
};

export const SmoothCurve: Story = {
  args: {
    data: [100, 110, 105, 120, 115, 130, 125, 140, 135, 150, 145, 160],
    color: "#8b5cf6",
    width: 100,
  },
};

export const LargeSize: Story = {
  args: {
    data: [
      1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900, 2200,
    ],
    color: "#3b82f6",
    width: 120,
    height: 40,
  },
};

export const SmallSize: Story = {
  args: {
    data: [
      1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900, 2200,
    ],
    color: "#3b82f6",
    width: 40,
    height: 15,
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Sparkline
          data={[
            1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900,
            2200,
          ]}
          color="#3b82f6"
          width={100}
        />
      </div>
      <div className="flex items-center gap-2">
        <Sparkline
          data={[
            800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1230, 1234,
          ]}
          color="#10b981"
          width={100}
        />
      </div>
      <div className="flex items-center gap-2">
        <Sparkline
          data={[8, 7.5, 7, 6.5, 6, 5.5, 5.2, 5.8, 5.4, 5.1, 5.3, 5.2]}
          color="#ef4444"
          width={100}
        />
      </div>
      <div className="flex items-center gap-2">
        <Sparkline
          data={[90, 91, 92, 93, 92.5, 93.5, 94, 93.8, 94.1, 94.3, 94.0, 94.2]}
          color="#f59e0b"
          width={100}
        />
      </div>
    </div>
  ),
};

export const WithShading: Story = {
  args: {
    data: [
      1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900, 2200,
    ],
    color: "#3b82f6",
    shading: true,
    width: 100,
  },
};
