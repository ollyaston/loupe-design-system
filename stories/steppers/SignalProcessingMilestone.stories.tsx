import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SignalProcessingMilestone } from "@/design-system/signal-processing-milestone";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof SignalProcessingMilestone> = {
  title: "Steppers/SignalProcessingMilestone",
  component: SignalProcessingMilestone,
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
type Story = StoryObj<typeof SignalProcessingMilestone>;

export const Default: Story = {
  args: {},
};

export const FailureAtValidation: Story = {
  args: {
    failedStepId: "validation",
    failureReason: "Invalid input format",
  },
};

export const FailureAtProcessing: Story = {
  args: {
    failedStepId: "processing",
    failureReason: "Processing error occurred",
  },
};

export const FailureAtEnrichment: Story = {
  args: {
    failedStepId: "enrichment",
    failureReason: "Enrichment step failed",
  },
};

export const FailureAtDelivery: Story = {
  args: {
    failedStepId: "delivery",
    failureReason: "Delivery failed",
  },
};

export const WithFailureAction: Story = {
  args: {
    failedStepId: "processing",
    failureReason: "Resource not found",
    failureAction: (
      <Button variant="outline" size="sm" onClick={() => {}}>
        Retry
      </Button>
    ),
  },
};

export const Pending: Story = {
  args: {
    isPending: true,
  },
};

export const CustomSteps: Story = {
  args: {
    title: "Custom pipeline",
    steps: [
      { id: "parse", label: "Parse input" },
      { id: "transform", label: "Transform data" },
      { id: "validate", label: "Validate output" },
      { id: "export", label: "Export" },
    ],
    failedStepId: "transform",
    failureReason: "Transformation failed",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Success (all completed)</h3>
        <SignalProcessingMilestone />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Failure at validation</h3>
        <SignalProcessingMilestone
          failedStepId="validation"
          failureReason="Invalid input format"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Failure at processing</h3>
        <SignalProcessingMilestone
          failedStepId="processing"
          failureReason="Processing error occurred"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Pending state</h3>
        <SignalProcessingMilestone isPending={true} />
      </div>
    </div>
  ),
};
