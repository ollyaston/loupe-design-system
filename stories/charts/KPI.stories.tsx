import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KPI, KpiRow } from "../../components/kpi";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof KPI> = {
  component: KPI,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "The label displayed above the metric value",
    },
    value: {
      control: "text",
      description: "The main metric value to display",
    },
    prefix: {
      control: "text",
      description: "Optional prefix to display before the value (e.g., $, €)",
    },
    change: {
      control: "object",
      description: "Change indicator with value and trend direction",
    },
    showChange: {
      control: "boolean",
      description: "Whether to show the change indicator",
    },
    simulatedValue: {
      control: "text",
      description: "Simulated value to show comparison with current value",
    },
    isLoading: {
      control: "boolean",
      description: "Whether to show loading skeleton",
    },
    disabled: {
      control: "boolean",
      description: "Whether the card is disabled (grayed out)",
    },

    tooltip: {
      control: "text",
      description: "Tooltip text to display when hovering over info icon",
    },
    description: {
      control: "text",
      description: "Optional description text displayed below the value",
    },
    sparklineData: {
      control: "object",
      description: "Array of numbers to display as a sparkline chart",
    },
    variant: {
      control: "select",
      options: ["default", "secondary"],
      description:
        "Background variant - default uses white background with border, secondary uses muted background",
    },
    formatNumbers: {
      control: "boolean",
      description:
        "Whether to format numeric values using human-readable format (e.g., 1234 -> 1.2k)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof KPI>;

export const Default: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
  },
};

export const WithChangeUp: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    change: {
      value: "12.5%",
      trend: "up",
    },
  },
};

export const WithChangeDown: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    change: {
      value: "8.2%",
      trend: "down",
    },
  },
};

export const WithTooltip: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    tooltip: "This metric shows the total revenue for the current period",
  },
};

export const WithSimulatedValue: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    simulatedValue: "15,678",
  },
};

export const Loading: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    disabled: true,
  },
};

export const NegativeValue: Story = {
  args: {
    label: "Loss",
    value: "2,500",
    prefix: "$",
    change: {
      value: "15.3%",
      trend: "down",
    },
  },
};

export const NoPrefix: Story = {
  args: {
    label: "Orders",
    value: "1,234",
    change: {
      value: "5.2%",
      trend: "up",
    },
  },
};

export const NoChange: Story = {
  args: {
    label: "Active users",
    value: "8,901",
    showChange: false,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Monthly revenue",
    value: "45,678",
    prefix: "$",
    description: "18.9k sales",
  },
};

export const ComplexExample: Story = {
  args: {
    label: "Customer satisfaction",
    value: "94.2",
    prefix: "%",
    change: {
      value: "2.1%",
      trend: "up",
    },
    tooltip: "Based on customer feedback surveys conducted this month",
    description: "18.9k ratings",
  },
};

export const WithSparkline: Story = {
  args: {
    label: "Revenue trend",
    value: "12,345",
    prefix: "$",
    change: {
      value: "12.5%",
      trend: "up",
    },
    sparklineData: [
      1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900, 2200,
    ],
  },
};

export const WithSparklineDown: Story = {
  args: {
    label: "Customer churn",
    value: "5.2",
    prefix: "%",
    change: {
      value: "2.1%",
      trend: "down",
    },
    sparklineData: [8, 7.5, 7, 6.5, 6, 5.5, 5.2, 5.8, 5.4, 5.1, 5.3, 5.2],
  },
};

export const SparklineOnly: Story = {
  args: {
    label: "Active users",
    value: "8,901",
    sparklineData: [
      5000, 5200, 5100, 5400, 5300, 5600, 5500, 5800, 5700, 6000, 5900, 6200,
    ],
  },
};

export const SecondaryVariant: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    change: {
      value: "12.5%",
      trend: "up",
    },
    variant: "secondary",
  },
};

export const SecondaryWithTooltip: Story = {
  args: {
    label: "Customer satisfaction",
    value: "94.2",
    prefix: "%",
    change: {
      value: "2.1%",
      trend: "up",
    },
    tooltip: "Based on customer feedback surveys conducted this month",
    variant: "secondary",
  },
};

export const SecondaryWithSparkline: Story = {
  args: {
    label: "Revenue trend",
    value: "12,345",
    prefix: "$",
    change: {
      value: "12.5%",
      trend: "up",
    },
    sparklineData: [
      1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900, 2200,
    ],
    variant: "secondary",
  },
};

export const SecondaryDisabled: Story = {
  args: {
    label: "Revenue",
    value: "12,345",
    prefix: "$",
    disabled: true,
    variant: "secondary",
  },
};

export const WithNumberFormatting: Story = {
  args: {
    label: "Revenue",
    value: "1,234,567",
    prefix: "$",
    change: {
      value: "12.5%",
      trend: "up",
    },
    formatNumbers: true,
  },
};

export const LargeNumbersComparison: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Without number formatting
        </h3>
        <KpiRow
          kpis={[
            {
              label: "Revenue",
              value: "1,234,567",
              prefix: "$",
              change: { value: "12.5%", trend: "up" },
            },
            {
              label: "Orders",
              value: "12,345,678",
              change: { value: "5.2%", trend: "up" },
            },
            {
              label: "Users",
              value: "123,456,789",
              change: { value: "2.1%", trend: "up" },
            },
            {
              label: "Revenue",
              value: "1,234,567,890",
              prefix: "$",
              change: { value: "15.3%", trend: "up" },
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          With number formatting (Hover for full numbers)
        </h3>
        <KpiRow
          kpis={[
            {
              label: "Revenue",
              value: "1,234,567",
              prefix: "$",
              change: { value: "12.5%", trend: "up" },
              formatNumbers: true,
            },
            {
              label: "Orders",
              value: "12,345,678",
              change: { value: "5.2%", trend: "up" },
              formatNumbers: true,
            },
            {
              label: "Users",
              value: "123,456,789",
              change: { value: "2.1%", trend: "up" },
              formatNumbers: true,
            },
            {
              label: "Revenue",
              value: "1,234,567,890",
              prefix: "$",
              change: { value: "15.3%", trend: "up" },
              formatNumbers: true,
            },
          ]}
        />
      </div>
    </div>
  ),
};

export const FormattedWithSimulatedValue: Story = {
  args: {
    label: "Revenue",
    value: "1,234,567",
    prefix: "$",
    simulatedValue: "1,500,000",
    formatNumbers: true,
  },
};

export const FormattedWithSparkline: Story = {
  args: {
    label: "Revenue trend",
    value: "1,234,567",
    prefix: "$",
    change: {
      value: "12.5%",
      trend: "up",
    },
    sparklineData: [
      1000000, 1200000, 1100000, 1400000, 1300000, 1600000, 1500000, 1800000,
      1700000, 2000000, 1900000, 2200000,
    ],
    formatNumbers: true,
  },
};

export const TooltipShowcase: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Hover over formatted numbers to see full values
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <KPI
            label="Revenue"
            value="1,234,567"
            prefix="$"
            change={{ value: "12.5%", trend: "up" }}
            formatNumbers
          />
          <KPI
            label="Orders"
            value="12,345,678"
            change={{ value: "5.2%", trend: "up" }}
            formatNumbers
          />
          <KPI
            label="Users"
            value="123,456,789"
            change={{ value: "2.1%", trend: "up" }}
            formatNumbers
          />
          <KPI
            label="Revenue"
            value="1,234,567,890"
            prefix="$"
            change={{ value: "15.3%", trend: "up" }}
            formatNumbers
          />
          <KPI
            label="With simulated value"
            value="1,234,567"
            prefix="$"
            simulatedValue="1,500,000"
            formatNumbers
          />
          <KPI
            label="Large change"
            value="999,999"
            prefix="$"
            change={{ value: "99.9%", trend: "up" }}
            formatNumbers
          />
        </div>
      </div>
    </div>
  ),
};
