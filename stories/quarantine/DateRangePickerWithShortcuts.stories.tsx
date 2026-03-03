import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateRangePickerWithShortcuts } from "../../design-system/date-range-picker-with-shortcuts";
import { Container } from "@/components/layouts/container";
import { FormField } from "@/design-system/form-field";
import { useState } from "react";
import { addMonths } from "date-fns";

const meta: Meta<typeof DateRangePickerWithShortcuts> = {
  component: DateRangePickerWithShortcuts,
  tags: ["autodocs"],
  title: "Date and time/daterangepickerwithshortcuts",
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    startDate: {
      control: "date",
      description: "The start date of the range",
    },
    endDate: {
      control: "date",
      description: "The end date of the range (undefined for 'Forever')",
    },
    onStartDateChange: {
      action: "startDateChanged",
      description: "Callback when start date changes",
    },
    onEndDateChange: {
      action: "endDateChanged",
      description: "Callback when end date changes",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePickerWithShortcuts>;

// Default story with no end date (Forever)
export const Default: Story = {
  render: () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
      <DateRangePickerWithShortcuts
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    );
  },
};

// With a 3-month range selected
export const ThreeMonthRange: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState<Date | undefined>(
      addMonths(today, 3),
    );

    return (
      <DateRangePickerWithShortcuts
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    );
  },
};

// With a 12-month range selected
export const TwelveMonthRange: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState<Date | undefined>(
      addMonths(today, 12),
    );

    return (
      <DateRangePickerWithShortcuts
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    );
  },
};

// With custom date range
export const CustomDateRange: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState<Date | undefined>(
      addMonths(today, 18),
    );

    return (
      <DateRangePickerWithShortcuts
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    );
  },
};

// In a form context
export const InForm: Story = {
  render: () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
      <div className="max-w-md">
        <form className="space-y-4">
          <FormField
            label="Order dates"
            description="Select the start and end date for this order"
            required
          >
            <DateRangePickerWithShortcuts
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </FormField>
        </form>
      </div>
    );
  },
};

// Demonstrating date range changes
export const Interactive: Story = {
  render: () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
      <div className="space-y-4">
        <DateRangePickerWithShortcuts
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Selected range:</p>
          <p className="text-sm">Start: {startDate.toLocaleDateString()}</p>
          <p className="text-sm">
            End: {endDate ? endDate.toLocaleDateString() : "Forever"}
          </p>
          {endDate && (
            <p className="text-sm text-muted-foreground mt-2">
              Duration:{" "}
              {Math.round(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              )}{" "}
              days
            </p>
          )}
        </div>
      </div>
    );
  },
};
