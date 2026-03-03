import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CreateWizardNav } from "@/design-system/create-wizard-nav";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof CreateWizardNav> = {
  component: CreateWizardNav,
  parameters: {
    docs: {
      description: {
        component:
          "A navigation component for wizards and multi-step flows. Supports left/right action buttons and an optional stepper in the center.",
      },
    },
  },
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
type Story = StoryObj<typeof CreateWizardNav>;

const sampleSteps = [
  { index: 1, title: "Setup", completed: true },
  { index: 2, title: "Configure", completed: false },
  { index: 3, title: "Deploy", completed: false },
  { index: 4, title: "Monitor", completed: false },
];

export const Default: Story = {
  args: {
    leftText: "Back",
    onLeftClick: () => console.log("Back clicked"),
    rightText: "Next",
    onRightClick: () => console.log("Next clicked"),
  },
};

export const WithStepper: Story = {
  args: {
    leftText: "Back",
    onLeftClick: () => console.log("Back clicked"),
    rightText: "Next",
    onRightClick: () => console.log("Next clicked"),
    stepper: {
      steps: sampleSteps,
      currentStep: 1,
      onStepClick: (stepIndex) => console.log("Step clicked:", stepIndex),
    },
  },
};

export const LeftOnly: Story = {
  args: {
    leftText: "Back",
    onLeftClick: () => console.log("Back clicked"),
  },
};

export const RightOnly: Story = {
  args: {
    rightText: "Skip",
    onRightClick: () => console.log("Skip clicked"),
  },
};

export const StepperOnly: Story = {
  args: {
    stepper: {
      steps: sampleSteps,
      currentStep: 2,
      onStepClick: (stepIndex) => console.log("Step clicked:", stepIndex),
    },
  },
};

export const LongStepTitles: Story = {
  args: {
    leftText: "Previous step",
    onLeftClick: () => console.log("Previous clicked"),
    rightText: "Continue",
    onRightClick: () => console.log("Continue clicked"),
    stepper: {
      steps: [
        {
          index: 1,
          title: "Very long step title that might wrap",
          completed: true,
        },
        {
          index: 2,
          title: "Another long title that could cause layout issues",
          completed: false,
        },
        { index: 3, title: "Short", completed: false },
      ],
      currentStep: 1,
      onStepClick: (stepIndex) => console.log("Step clicked:", stepIndex),
    },
  },
};
