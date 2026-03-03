import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Stepper } from "@/design-system/stepper";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Stepper,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSteps = [
  { index: 1, title: "Setup" },
  { index: 2, title: "Configure" },
  { index: 3, title: "Deploy" },
  { index: 4, title: "Monitor" },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
  },
};

export const LongTitles: Story = {
  args: {
    steps: [
      {
        index: 1,
        title: "Very long step title that might wrap",
      },
      {
        index: 2,
        title: "Another long title",
      },
      { index: 3, title: "Short" },
    ],
    currentStep: 1,
  },
};
