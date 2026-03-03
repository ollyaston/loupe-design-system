import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Logo } from "../../design-system/logo";

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-4 text-sidebar-foreground">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: "number", min: 20, max: 500, step: 10 },
      description: "The width of the logo in pixels",
    },
    variant: {
      control: { type: "select" },
      options: ["logotype", "icon", "logotype-only"],
      description:
        "The variant of the logo: 'logotype' shows icon + wordmark, 'icon' shows only the icon, 'logotype-only' shows only the Loupe wordmark",
    },
    color: {
      control: { type: "text" },
      description:
        "Optional color string (e.g., '#000000', 'rgb(255, 255, 255)', '#fff'). If not provided, the logo will inherit the parent element's text color (currentColor).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

// Helper component to show multiple sizes
const MultipleSizes = ({
  variant,
  color,
  sizes,
}: {
  variant: "logotype" | "icon" | "logotype-only";
  color?: string;
  sizes: number[];
}) => (
  <div className="flex flex-col gap-8">
    {sizes.map((size) => (
      <div key={size} className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-16">{size}px</div>
        <Logo size={size} variant={variant} color={color} />
      </div>
    ))}
  </div>
);

// Icon stories
export const Icon: Story = {
  render: () => <MultipleSizes variant="icon" sizes={[24, 36, 48, 72, 90]} />,
  parameters: {
    docs: {
      description: {
        story:
          "Icon variant using currentColor. The color will inherit from the parent element's text color. Shows multiple sizes.",
      },
    },
  },
};

export const IconWithCustomColor: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">Blue (#3b82f6)</div>
        <Logo size={72} variant="icon" color="#3b82f6" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">
          Purple (#a855f7)
        </div>
        <Logo size={72} variant="icon" color="#a855f7" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">
          Green (#10b981)
        </div>
        <Logo size={72} variant="icon" color="#10b981" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon variant with custom color strings. You can use any valid CSS color value.",
      },
    },
  },
};

// Logotype (both icon + wordmark) stories
export const Logotype: Story = {
  render: () => (
    <MultipleSizes variant="logotype" sizes={[84, 168, 252, 336]} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full logotype variant (icon + wordmark) using currentColor. The color will inherit from the parent element's text color. Shows multiple sizes.",
      },
    },
  },
};

export const LogotypeWithCustomColor: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">Blue (#3b82f6)</div>
        <Logo size={168} variant="logotype" color="#3b82f6" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">
          Purple (#a855f7)
        </div>
        <Logo size={168} variant="logotype" color="#a855f7" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">
          Green (#10b981)
        </div>
        <Logo size={168} variant="logotype" color="#10b981" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full logotype variant (icon + wordmark) with custom color strings. You can use any valid CSS color value.",
      },
    },
  },
};

// Logotype-only (wordmark) stories
export const LogotypeOnly: Story = {
  render: () => (
    <MultipleSizes variant="logotype-only" sizes={[91, 120, 182, 244]} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wordmark-only variant using currentColor. The color will inherit from the parent element's text color. Shows multiple sizes.",
      },
    },
  },
};

export const LogotypeOnlyWithCustomColor: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">Blue (#3b82f6)</div>
        <Logo size={182} variant="logotype-only" color="#3b82f6" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">
          Purple (#a855f7)
        </div>
        <Logo size={182} variant="logotype-only" color="#a855f7" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground w-32">
          Green (#10b981)
        </div>
        <Logo size={182} variant="logotype-only" color="#10b981" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wordmark-only variant with custom color strings. You can use any valid CSS color value.",
      },
    },
  },
};
