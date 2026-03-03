import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Calendar } from "@/design-system/calendar";
import { Container } from "@/components/layouts/container";

const meta = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Calendar mode="single" className="rounded-md border" />,
};

export const WithSelectedDate: Story = {
  render: () => (
    <Calendar
      mode="single"
      selected={new Date()}
      className="rounded-md border"
    />
  ),
};

export const DateRange: Story = {
  render: () => <Calendar mode="range" className="rounded-md border" />,
};

export const Multiple: Story = {
  render: () => <Calendar mode="multiple" className="rounded-md border" />,
};

export const WithDisabledDates: Story = {
  render: () => (
    <Calendar
      mode="single"
      disabled={[
        {
          from: new Date(2024, 0, 1),
          to: new Date(2024, 0, 7),
        },
        {
          from: new Date(2024, 0, 15),
          to: new Date(2024, 0, 21),
        },
      ]}
      className="rounded-md border"
    />
  ),
};

export const WithFixedWeeks: Story = {
  render: () => (
    <Calendar mode="single" fixedWeeks className="rounded-md border" />
  ),
};
