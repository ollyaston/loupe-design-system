import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KpiRow } from "../../components/kpi";
import { KPI } from "../../components/kpi";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof KpiRow> = {
  component: KpiRow,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    kpis: {
      control: "object",
      description: "Array of KPI objects to render",
    },
    variant: {
      control: "select",
      options: ["default", "secondary"],
      description: "Default variant for all KPIs in the row",
    },
  },
};

export default meta;
type Story = StoryObj<typeof KpiRow>;

export const Default: Story = {
  args: {
    kpis: [
      {
        label: "Revenue",
        value: "12,345",
        prefix: "$",
        change: { value: "12.5%", trend: "up" },
      },
      {
        label: "Orders",
        value: "1,234",
        change: { value: "5.2%", trend: "up" },
      },
      {
        label: "Customer satisfaction",
        value: "94.2",
        prefix: "%",
        change: { value: "2.1%", trend: "up" },
        tooltip: "Based on customer feedback surveys",
      },
      {
        label: "Churn rate",
        value: "5.2",
        prefix: "%",
        change: { value: "2.1%", trend: "down" },
      },
    ],
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    kpis: [
      {
        label: "Revenue",
        value: "12,345",
        prefix: "$",
        change: { value: "12.5%", trend: "up" },
      },
      {
        label: "Orders",
        value: "1,234",
        change: { value: "5.2%", trend: "up" },
      },
      {
        label: "Customer satisfaction",
        value: "94.2",
        prefix: "%",
        change: { value: "2.1%", trend: "up" },
        tooltip: "Based on customer feedback surveys",
      },
      {
        label: "Churn rate",
        value: "5.2",
        prefix: "%",
        change: { value: "2.1%", trend: "down" },
      },
    ],
  },
};

export const WithFormatting: Story = {
  args: {
    kpis: [
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
    ],
  },
};

export const NoChange: Story = {
  args: {
    kpis: [
      {
        label: "Active users",
        value: "8,901",
        showChange: false,
      },
      {
        label: "Total orders",
        value: "15,432",
        showChange: false,
      },
      {
        label: "Conversion rate",
        value: "3.2",
        prefix: "%",
        showChange: false,
      },
      {
        label: "Avg order value",
        value: "89.50",
        prefix: "$",
        showChange: false,
      },
    ],
  },
};

export const WithSparklines: Story = {
  args: {
    kpis: [
      {
        label: "Revenue trend",
        value: "12,345",
        prefix: "$",
        change: { value: "12.5%", trend: "up" },
        sparklineData: [
          1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800, 1700, 2000, 1900,
          2200,
        ],
      },
      {
        label: "Customer churn",
        value: "5.2",
        prefix: "%",
        change: { value: "2.1%", trend: "down" },
        sparklineData: [8, 7.5, 7, 6.5, 6, 5.5, 5.2, 5.8, 5.4, 5.1, 5.3, 5.2],
      },
      {
        label: "Active users",
        value: "8,901",
        sparklineData: [
          5000, 5200, 5100, 5400, 5300, 5600, 5500, 5800, 5700, 6000, 5900,
          6200,
        ],
      },
      {
        label: "Orders",
        value: "1,234",
        change: { value: "5.2%", trend: "up" },
        sparklineData: [
          800, 900, 850, 1000, 950, 1100, 1050, 1200, 1150, 1300, 1250, 1400,
        ],
      },
    ],
  },
};

export const MixedStates: Story = {
  args: {
    kpis: [
      {
        label: "Revenue",
        value: "12,345",
        prefix: "$",
        change: { value: "12.5%", trend: "up" },
      },
      {
        label: "Loading metric",
        value: "0",
        isLoading: true,
      },
      {
        label: "Disabled metric",
        value: "5,432",
        prefix: "$",
        disabled: true,
      },
      {
        label: "With simulated value",
        value: "8,901",
        prefix: "$",
        simulatedValue: "10,500",
      },
    ],
  },
};

export const WithDescriptions: Story = {
  args: {
    kpis: [
      {
        label: "Monthly revenue",
        value: "45,678",
        prefix: "$",
        change: { value: "12.5%", trend: "up" },
        description: "18.9k sales",
      },
      {
        label: "Customer satisfaction",
        value: "94.2",
        prefix: "%",
        change: { value: "2.1%", trend: "up" },
        tooltip: "Based on customer feedback surveys",
        description: "18.9k ratings",
      },
      {
        label: "Conversion rate",
        value: "3.2",
        prefix: "%",
        change: { value: "0.5%", trend: "up" },
        description: "2.1k conversions",
      },
      {
        label: "Avg order value",
        value: "89.50",
        prefix: "$",
        change: { value: "5.2%", trend: "up" },
        description: "Based on 1.2k orders",
      },
    ],
  },
};

export const ThreeColumns: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KPI
        label="Revenue"
        value="12,345"
        prefix="$"
        change={{ value: "12.5%", trend: "up" }}
      />
      <KPI
        label="Orders"
        value="1,234"
        change={{ value: "5.2%", trend: "up" }}
      />
      <KPI
        label="Customer satisfaction"
        value="94.2"
        prefix="%"
        change={{ value: "2.1%", trend: "up" }}
        tooltip="Based on customer feedback surveys"
      />
    </div>
  ),
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
          With Number Formatting (Hover for full numbers)
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
