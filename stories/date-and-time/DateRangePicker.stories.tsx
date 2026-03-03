import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateRangePicker } from "../../design-system/date-range-picker";
import { Calendar } from "../../design-system/calendar";
import { Container } from "@/components/layouts/container";
import { FormField } from "@/design-system/form-field";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    dateRange: {
      control: "object",
      description: "The selected date range with 'from' and 'to' dates",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date range is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date range picker is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Default story
export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
      undefined,
    );

    return (
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        placeholder="Pick a date range"
      />
    );
  },
};

// With selected date range
export const WithSelectedRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 15),
      to: new Date(2024, 0, 25),
    });

    return (
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        placeholder="Pick a date range"
      />
    );
  },
};

// With only start date selected
export const WithStartDateOnly: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
    });

    return (
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        placeholder="Pick a date range"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 15),
      to: new Date(2024, 0, 25),
    });

    return (
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        placeholder="Pick a date range"
        disabled
      />
    );
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
      undefined,
    );

    return (
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        placeholder="Select booking period"
      />
    );
  },
};

// In a form context
export const InForm: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
      undefined,
    );

    return (
      <div className="max-w-2xl">
        <form className="space-y-4">
          <FormField
            label="Reporting period"
            description="Choose the start and end dates for your report"
            required
          >
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              placeholder="Select date range"
            />
          </FormField>
          {dateRange?.from && dateRange?.to && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Selected range:</p>
              <p className="text-sm">
                From: {dateRange.from.toLocaleDateString()}
              </p>
              <p className="text-sm">To: {dateRange.to.toLocaleDateString()}</p>
              <p className="text-sm mt-2">
                Duration:{" "}
                {Math.ceil(
                  (dateRange.to.getTime() - dateRange.from.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                days
              </p>
            </div>
          )}
        </form>
      </div>
    );
  },
};

// Multiple date range pickers
export const MultipleDateRangePickers: Story = {
  render: () => {
    const [previousPeriod, setPreviousPeriod] = useState<DateRange | undefined>(
      undefined,
    );
    const [currentPeriod, setCurrentPeriod] = useState<DateRange | undefined>(
      undefined,
    );

    return (
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">
            Previous period
          </label>
          <DateRangePicker
            dateRange={previousPeriod}
            onDateRangeChange={setPreviousPeriod}
            placeholder="Select previous period"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Current period
          </label>
          <DateRangePicker
            dateRange={currentPeriod}
            onDateRangeChange={setCurrentPeriod}
            placeholder="Select current period"
          />
        </div>
      </div>
    );
  },
};

// Inline calendar without popover
export const InlineCalendar: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
      undefined,
    );

    return (
      <div className="space-y-4">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
        {dateRange?.from && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Selected range:</p>
            <p className="text-sm">
              From: {dateRange.from.toLocaleDateString()}
            </p>
            {dateRange.to && (
              <>
                <p className="text-sm">
                  To: {dateRange.to.toLocaleDateString()}
                </p>
                <p className="text-sm mt-2">
                  Duration:{" "}
                  {Math.ceil(
                    (dateRange.to.getTime() - dateRange.from.getTime()) /
                      (1000 * 60 * 60 * 24),
                  ) + 1}{" "}
                  days
                </p>
              </>
            )}
          </div>
        )}
      </div>
    );
  },
};

// Preset ranges example
export const WithPresetRanges: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
      undefined,
    );

    const today = new Date();
    const presets = [
      {
        label: "Last 7 days",
        range: {
          from: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 6,
          ),
          to: today,
        },
      },
      {
        label: "Last 30 days",
        range: {
          from: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 29,
          ),
          to: today,
        },
      },
      {
        label: "This month",
        range: {
          from: new Date(today.getFullYear(), today.getMonth(), 1),
          to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
        },
      },
      {
        label: "Last month",
        range: {
          from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          to: new Date(today.getFullYear(), today.getMonth(), 0),
        },
      },
    ];

    return (
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">Date range</label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            placeholder="Select date range"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Quick presets:</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setDateRange(preset.range)}
                className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
