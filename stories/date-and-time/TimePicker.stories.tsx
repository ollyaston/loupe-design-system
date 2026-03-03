import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimePicker } from "../../design-system/time-picker";
import { Container } from "@/components/layouts/container";
import { FormField } from "@/design-system/form-field";
import { useState } from "react";

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    time: {
      control: "text",
      description: "The selected time in HH:mm format",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no time is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the time picker is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// Default story
export const Default: Story = {
  render: () => {
    const [time, setTime] = useState<string>("");

    return (
      <TimePicker
        time={time}
        onTimeChange={setTime}
        placeholder="Select time"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [time, setTime] = useState<string>("09:00");

    return (
      <TimePicker
        time={time}
        onTimeChange={setTime}
        placeholder="Select time"
        disabled
      />
    );
  },
};

// In a form context
export const InForm: Story = {
  render: () => {
    const [time, setTime] = useState<string>("");

    return (
      <div className="max-w-md">
        <form className="space-y-4">
          <FormField
            label="Appointment time"
            description="The time for your scheduled appointment"
            required
          >
            <TimePicker
              time={time}
              onTimeChange={setTime}
              placeholder="Select appointment time"
            />
          </FormField>
        </form>
      </div>
    );
  },
};
