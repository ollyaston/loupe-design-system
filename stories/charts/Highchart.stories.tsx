import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Highchart } from "../../design-system/highchart";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Highchart> = {
  component: Highchart,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Highchart>;

export const LineChart: Story = {
  args: {
    options: {
      title: {
        text: "Monthly average temperature",
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        title: {
          text: "Temperature (°C)",
        },
      },
      series: [
        {
          name: "Tokyo",
          type: "line",
          color: "var(--color-chart-1)",
          data: [
            7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
          ],
        },
        {
          name: "London",
          type: "line",
          color: "var(--color-chart-2)",
          data: [
            3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
          ],
        },
      ],
    },
  },
};

export const ColumnChart: Story = {
  args: {
    options: {
      title: {
        text: "Monthly average rainfall",
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        title: {
          text: "Rainfall (mm)",
        },
      },
      series: [
        {
          name: "Tokyo",
          type: "column",
          color: "var(--color-chart-1)",
          data: [
            49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            95.6, 54.4,
          ],
        },
        {
          name: "New York",
          type: "column",
          color: "var(--color-chart-2)",
          data: [
            83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
            106.6, 92.3,
          ],
        },
      ],
      chart: {
        type: "column",
      },
    },
  },
};

export const PieChart: Story = {
  args: {
    options: {
      title: {
        text: "Browser market shares in January, 2025",
      },
      series: [
        {
          name: "Browsers",
          type: "pie",
          colors: [
            "var(--color-chart-1)",
            "var(--color-chart-2)",
            "var(--color-chart-3)",
            "var(--color-chart-4)",
            "var(--color-chart-5)",
            "var(--color-muted)",
          ],
          data: [
            ["Chrome", 58.9],
            ["Firefox", 13.29],
            // eslint-disable-next-line agent-loupe-ui/sentence-case
            ["Internet Explorer", 13],
            ["Edge", 3.78],
            ["Safari", 3.42],
            {
              name: "Other",
              y: 7.61,
              dataLabels: {
                enabled: false,
              },
            },
          ],
        },
      ],
      chart: {
        type: "pie",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
    },
  },
};

export const AreaChart: Story = {
  args: {
    options: {
      title: {
        text: "US and USSR nuclear stockpiles",
      },
      xAxis: {
        categories: [
          "1945",
          "1950",
          "1955",
          "1960",
          "1965",
          "1970",
          "1975",
          "1980",
          "1985",
          "1990",
          "1995",
          "2000",
        ],
      },
      yAxis: {
        title: {
          text: "Nuclear weapon states",
        },
      },
      series: [
        {
          name: "USA",
          type: "area",
          color: "var(--color-chart-1)",
          data: [0, 0, 0, 0, 0, 6, 11, 32, 110, 235, 369, 640],
        },
        {
          name: "USSR/Russia",
          type: "area",
          color: "var(--color-chart-2)",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 25],
        },
      ],
      chart: {
        type: "area",
      },
    },
  },
};

export const ChartColors: Story = {
  args: {
    options: {
      title: {
        text: "Design system chart colors",
      },
      xAxis: {
        categories: ["Q1", "Q2", "Q3", "Q4"],
      },
      yAxis: {
        title: {
          text: "Revenue ($)",
        },
      },
      series: [
        {
          name: "Product A",
          type: "line",
          color: "var(--color-chart-1)",
          data: [120, 135, 148, 162],
        },
        {
          name: "Product B",
          type: "line",
          color: "var(--color-chart-2)",
          data: [95, 108, 115, 128],
        },
        {
          name: "Product C",
          type: "line",
          color: "var(--color-chart-3)",
          data: [78, 85, 92, 98],
        },
        {
          name: "Product D",
          type: "line",
          color: "var(--color-chart-4)",
          data: [45, 52, 58, 65],
        },
        {
          name: "Product E",
          type: "line",
          color: "var(--color-chart-5)",
          data: [32, 38, 42, 48],
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          This chart demonstrates all five chart colors from the design system.
          Colors automatically adapt to light/dark themes.
        </div>
        <Container className="p-4">
          <Story />
        </Container>
      </div>
    ),
  ],
};

export const DarkModeDemo: Story = {
  args: {
    options: {
      title: {
        text: "Dark Mode Demo - Toggle your system theme to see the difference",
      },
      xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      yAxis: {
        title: {
          text: "Values",
        },
      },
      series: [
        {
          name: "Series 1",
          type: "line",
          color: "var(--color-chart-1)",
          data: [10, 20, 15, 25, 30, 35],
        },
        {
          name: "Series 2",
          type: "column",
          color: "var(--color-chart-2)",
          data: [5, 15, 10, 20, 25, 30],
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          This chart automatically adapts to your system&apos;s light/dark
          theme. Try toggling your system theme or browser dark mode to see the
          difference.
        </div>
        <Container className="p-4">
          <Story />
        </Container>
      </div>
    ),
  ],
};
