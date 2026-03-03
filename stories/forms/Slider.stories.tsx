import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "@/design-system/slider";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Slider,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="Volume" required>
      <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
    </FormField>
  ),
};

export const Range: Story = {
  render: () => (
    <FormField
      label="Price range"
      required
      description="Select your preferred price range"
    >
      <Slider defaultValue={[20, 80]} max={100} step={1} className="w-full" />
    </FormField>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <FormField
      label="Difficulty level"
      required
      hintText="Choose a difficulty level that matches your skill level"
    >
      <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
    </FormField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormField
      label="Volume"
      required
      description="Adjust the volume level to your preference"
    >
      <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
    </FormField>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <FormField
      label="Brightness"
      required
      layout="horizontal"
      description="Adjust the brightness of your display"
    >
      <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
    </FormField>
  ),
};

export const WithValueDisplay: Story = {
  render: () => (
    <FormField
      label="Temperature"
      required
      description="Set your preferred room temperature"
    >
      <div className="space-y-2">
        <Slider
          defaultValue={[22]}
          max={30}
          min={16}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>16°C</span>
          <span>22°C</span>
          <span>30°C</span>
        </div>
      </div>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField
      label="Volume"
      required
      description="Please set a valid volume level"
    >
      <Slider defaultValue={[33]} max={100} step={1} className="w-full" error />
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField label="Disabled volume" description="This slider is disabled">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className="w-full"
        disabled
      />
    </FormField>
  ),
};

export const MultipleSliders: Story = {
  render: () => (
    <div className="space-y-6">
      <FormField
        label="Brightness"
        required
        description="Adjust the brightness of your display"
      >
        <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
      </FormField>

      <FormField
        label="Contrast"
        required
        description="Fine-tune the contrast settings"
      >
        <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
      </FormField>

      <FormField
        label="Saturation"
        required
        description="Control the color saturation"
      >
        <Slider defaultValue={[40]} max={100} step={1} className="w-full" />
      </FormField>
    </div>
  ),
};
