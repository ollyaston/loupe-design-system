"use client";

import * as React from "react";
import { Chart } from "@highcharts/react";
import type { Options } from "highcharts";

import { useDarkMode } from "@/lib/theme-utils";

const Highchart = (props: React.ComponentProps<typeof Chart>) => {
  // TODO - pass in as a prop?
  const isDark = useDarkMode();

  const defaultOptions: Partial<Options> = {
    chart: {
      backgroundColor: isDark
        ? "var(--color-background-dark)"
        : "var(--color-background-light)",
      style: {
        fontFamily: "inherit",
        color: isDark
          ? "var(--color-foreground-dark)"
          : "var(--color-foreground-light)",
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      borderRadius: 8,
      shape: "rect",
      backgroundColor: isDark
        ? "var(--color-popover-dark)"
        : "var(--color-popover-light)",
      borderColor: isDark
        ? "var(--color-border-dark)"
        : "var(--color-border-light)",
      shadow: {
        offsetX: 0,
        offsetY: 2,
        width: 4,
        color: isDark ? "var(--color-pigeon-950)" : "var(--color-pigeon-200)",
        opacity: 0.15,
      },
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
        color: isDark
          ? "var(--color-popover-foreground-dark)"
          : "var(--color-popover-foreground-light)",
      },
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      area: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      column: {},
      bar: {},
      scatter: {
        marker: {
          enabled: true, // Keep markers for scatter plots
        },
      },
    },
  };

  const mergedOptions = React.useMemo(() => {
    return {
      ...defaultOptions,
      ...props.options,
      chart: {
        ...defaultOptions.chart,
        ...props.options?.chart,
      },
      xAxis: {
        lineColor: isDark
          ? "var(--color-border-dark)"
          : "var(--color-border-light)",
        tickColor: isDark
          ? "var(--color-border-dark)"
          : "var(--color-border-light)",
        labels: {
          style: {
            fontFamily: "var(--font-mono)",
            color: isDark
              ? "var(--color-foreground-dark)"
              : "var(--color-foreground-light)",
          },
        },
        title: {
          style: {
            color: isDark
              ? "var(--color-foreground-dark)"
              : "var(--color-foreground-light)",
          },
        },
        ...props.options?.xAxis,
      },
      yAxis: {
        lineColor: isDark
          ? "var(--color-border-dark)"
          : "var(--color-border-light)",
        tickColor: isDark
          ? "var(--color-border-dark)"
          : "var(--color-border-light)",
        labels: {
          style: {
            fontFamily: "var(--font-mono)",
            color: isDark
              ? "var(--color-foreground-dark)"
              : "var(--color-foreground-light)",
          },
        },
        title: {
          style: {
            color: isDark
              ? "var(--color-foreground-dark)"
              : "var(--color-foreground-light)",
          },
        },
        ...props.options?.yAxis,
      },
      title: {
        style: {
          color: isDark
            ? "var(--color-foreground-dark)"
            : "var(--color-foreground-light)",
        },
        ...props.options?.title,
      },
      legend: {
        itemStyle: {
          color: isDark
            ? "var(--color-foreground-dark)"
            : "var(--color-foreground-light)",
        },
        itemHoverStyle: {
          color: isDark
            ? "var(--color-muted-foreground-dark)"
            : "var(--color-muted-foreground-light)",
        },
        ...props.options?.legend,
      },
      plotOptions: {
        ...defaultOptions.plotOptions,
        ...props.options?.plotOptions,
      },
      tooltip: {
        ...defaultOptions.tooltip,
        ...props.options?.tooltip,
      },
      credits: {
        ...defaultOptions.credits,
        ...props.options?.credits,
      },
    };
  }, [props.options, isDark]);

  return (
    <div className="loupe-system">
      <Chart options={mergedOptions} />
    </div>
  );
};

Highchart.displayName = "Highchart";

export interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  shading?: boolean;
}

const Sparkline = ({
  data,
  color = "var(--color-chart-1)",
  width,
  height = 20,
  shading = false,
}: SparklineProps) => {
  const isDark = useDarkMode();

  const options: Options = {
    chart: {
      type: "area",
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      backgroundColor: "transparent",
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
      style: {
        fontFamily: "inherit",
      },
      // Don't use styledMode for sparklines
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: false,
      min: 0,
      max: data.length - 1,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      visible: false,
      // Handle edge case where all values are the same (e.g., all zeros)
      min: (() => {
        if (data.length === 0) return 0;
        const minVal = Math.min(...data);
        const maxVal = Math.max(...data);
        // If all values are the same, create a range around that value
        if (minVal === maxVal) return minVal - 1;
        return minVal;
      })(),
      max: (() => {
        if (data.length === 0) return 1;
        const minVal = Math.min(...data);
        const maxVal = Math.max(...data);
        // If all values are the same, create a range around that value
        if (minVal === maxVal) return maxVal + 1;
        return maxVal;
      })(),
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
        lineWidth: 2.5,
        color,
        ...(shading
          ? {
              fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, color + "40"], // Light version of the color with 25% opacity
                  [1, color + "00"], // Transparent
                ],
              },
            }
          : {
              fillColor: "transparent",
            }),
        states: {
          hover: {
            lineWidth: 2.5,
          },
        },
      },
    },
    series: [
      {
        type: "area",
        data,
        showInLegend: false,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    ],
  };

  return <Chart options={options} />;
};

Sparkline.displayName = "Sparkline";

export { Highchart, Sparkline };
