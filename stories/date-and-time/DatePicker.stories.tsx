import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DatePicker } from "../../design-system/date-picker";
import { Calendar } from "../../design-system/calendar";
import { Container } from "@/components/layouts/container";
import { FormField } from "@/design-system/form-field";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    date: {
      control: "date",
      description: "The selected date",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date picker is disabled",
    },
    showDropdowns: {
      control: "boolean",
      description: "Whether to show month/year dropdowns instead of label",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Default story
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Pick a date"
      />
    );
  },
};

// With selected date
export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Pick a date"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Pick a date"
        disabled
      />
    );
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Select start date"
      />
    );
  },
};

// With dropdowns for month and year
export const WithDropdowns: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Pick a date"
        showDropdowns
      />
    );
  },
};

// Inline calendar without popover
export const InlineCalendar: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <div className="space-y-4">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        {date && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Selected date:</p>
            <p className="text-sm">{date.toLocaleDateString()}</p>
          </div>
        )}
      </div>
    );
  },
};

// In a form context
export const InForm: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <div className="max-w-md">
        <form className="space-y-4">
          <FormField
            label="Quote expiration date"
            description="The date when this quote will expire"
            required
          >
            <DatePicker
              date={date}
              onDateChange={setDate}
              placeholder="Select expiration date"
            />
          </FormField>
        </form>
      </div>
    );
  },
};
