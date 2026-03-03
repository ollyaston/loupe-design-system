import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { TimeIncrementSelector } from "@/design-system/time-increment-selector";
import { Container } from "@/components/layouts/container";

const meta = {
  component: TimeIncrementSelector,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof TimeIncrementSelector>;

export default meta;
type Story = StoryObj<typeof TimeIncrementSelector>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("minutes");

    return (
      <div className="w-[400px]">
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("minutes");

    return (
      <div className="w-[400px]">
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
        />
      </div>
    );
  },
};

export const InHours: Story = {
  render: () => {
    const [value, setValue] = useState(2);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("hours");

    return (
      <div className="w-[400px]">
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
        />
      </div>
    );
  },
};

export const InDays: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("days");

    return (
      <div className="w-[400px]">
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
        />
      </div>
    );
  },
};

export const InFormField: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("minutes");

    return (
      <div className="w-[400px] space-y-2">
        <label className="text-sm font-medium">Time to complete</label>
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
        />
        <p className="text-xs text-muted-foreground">
          Enter how long this task takes
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(15);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("minutes");

    return (
      <div className="w-[400px]">
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
          disabled
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState<"minutes" | "hours" | "days">("minutes");

    return (
      <div className="w-[400px] space-y-2">
        <label className="text-sm font-medium">Time to complete</label>
        <TimeIncrementSelector
          value={value}
          onChange={setValue}
          unit={unit}
          onUnitChange={setUnit}
          error
        />
        <p className="text-xs text-destructive">Duration is required</p>
      </div>
    );
  },
};

export const AllUnitsComparison: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="w-[400px] space-y-2">
          <label className="text-sm font-medium">Minutes</label>
          <TimeIncrementSelector
            value={30}
            onChange={() => {}}
            unit="minutes"
            onUnitChange={() => {}}
          />
        </div>
        <div className="w-[400px] space-y-2">
          <label className="text-sm font-medium">Hours</label>
          <TimeIncrementSelector
            value={2}
            onChange={() => {}}
            unit="hours"
            onUnitChange={() => {}}
          />
        </div>
        <div className="w-[400px] space-y-2">
          <label className="text-sm font-medium">Days</label>
          <TimeIncrementSelector
            value={1}
            onChange={() => {}}
            unit="days"
            onUnitChange={() => {}}
          />
        </div>
      </div>
    );
  },
};
