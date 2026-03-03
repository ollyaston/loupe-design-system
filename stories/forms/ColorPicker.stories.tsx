import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { ColorPicker } from "@/design-system/shadcn-io/color-picker";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";
import { Popover } from "@/design-system/popover";
import { Button } from "@/design-system/button";

const meta = {
  component: ColorPicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState("#000000");

    return (
      <ColorPicker value={color} onChange={(value) => setColor(value.hex)} />
    );
  },
};

export const InFormField: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");

    return (
      <FormField
        label="Brand color"
        required
        description="Choose your brand's primary color"
        hintText="This color will be used throughout your application for branding and theme consistency"
      >
        <ColorPicker value={color} onChange={(value) => setColor(value.hex)} />
      </FormField>
    );
  },
};

export const WithAlpha: Story = {
  render: () => {
    const [color, setColor] = useState("#8b5cf6");

    return (
      <ColorPicker value={color} onChange={(value) => setColor(value.hex)} />
    );
  },
};

export const WithoutAlpha: Story = {
  render: () => {
    const [color, setColor] = useState("#10b981");

    return (
      <ColorPicker
        value={color}
        onChange={(value) => setColor(value.hex)}
        showAlpha={false}
      />
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [color, setColor] = useState("#f59e0b");

    return (
      <ColorPicker
        value={color}
        onChange={(value) => setColor(value.hex)}
        selectionHeight="h-32"
        showAlpha={false}
      />
    );
  },
};

export const WithValueDisplay: Story = {
  render: () => {
    const [color, setColor] = useState<string>("#ef4444");

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={(value) => setColor(value.hex)} />
        <div className="rounded-md border bg-muted p-4">
          <p className="text-sm text-muted-foreground">Selected color:</p>
          <div className="mt-2 flex items-center gap-3">
            <div
              className="h-10 w-10 rounded border"
              style={{ backgroundColor: color }}
            />
            <code className="text-sm">{color}</code>
          </div>
        </div>
      </div>
    );
  },
};

export const MultiplePickers: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = useState("#3b82f6");
    const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
    const [successColor, setSuccessColor] = useState("#10b981");

    return (
      <div className="space-y-6">
        <ColorPicker
          value={primaryColor}
          onChange={(value) => setPrimaryColor(value.hex)}
          selectionHeight="h-40"
          showAlpha={false}
        />

        <ColorPicker
          value={secondaryColor}
          onChange={(value) => setSecondaryColor(value.hex)}
          selectionHeight="h-40"
          showAlpha={false}
        />

        <ColorPicker
          value={successColor}
          onChange={(value) => setSuccessColor(value.hex)}
          selectionHeight="h-40"
          showAlpha={false}
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  render: () => {
    const [color, setColor] = useState("#ec4899");

    return (
      <ColorPicker
        value={color}
        onChange={(value) => setColor(value.hex)}
        selectionHeight="h-40"
        showHue={false}
        showAlpha={false}
        showEyeDropper={false}
      />
    );
  },
};

export const WithoutEyeDropper: Story = {
  render: () => {
    const [color, setColor] = useState("#ec4899");

    return (
      <ColorPicker
        value={color}
        onChange={(value) => setColor(value.hex)}
        showEyeDropper={false}
      />
    );
  },
};

// Uncontrolled example - demonstrates default value without state management
export const Uncontrolled: Story = {
  render: () => (
    <ColorPicker defaultValue="#f59e0b" showFormatSelector={false} />
  ),
};

export const InPopover: Story = {
  render: () => {
    const [color, setColor] = useState("#8b5cf6");

    return (
      <Popover
        triggerContent={
          <Button variant="outline" className="w-64 justify-start gap-2">
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: color }}
            />
            <span>{color}</span>
          </Button>
        }
        className="w-auto p-4"
        align="start"
      >
        <FormField
          label="Theme color"
          description="Choose a color for your theme"
        >
          <ColorPicker
            value={color}
            onChange={(value) => setColor(value.hex)}
            width="full"
            selectionHeight="h-40"
          />
        </FormField>
      </Popover>
    );
  },
};
