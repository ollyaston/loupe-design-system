import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Toggle } from "@/design-system/toggle";
import { Icon } from "@/design-system/icon";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        //  "outline"
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    pressed: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: "Toggle",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Toggle",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="favorite" size={16} />
        Like
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: <Icon name="favorite" size={16} />,
  },
};

export const Outline: Story = {
  args: {
    // variant: "outline",
    children: "Toggle",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Toggle",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Toggle",
  },
};

export const SmallIconOnly: Story = {
  args: {
    size: "sm",
    children: <Icon name="favorite" size={14} />,
  },
};

export const LargeIconOnly: Story = {
  args: {
    size: "lg",
    children: <Icon name="favorite" size={18} />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Default</h4>
        <div className="flex gap-2">
          <Toggle>Toggle</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Outline</h4>
        <div className="flex gap-2">
          <Toggle variant="outline">Toggle</Toggle>
          <Toggle variant="outline" disabled>
            Disabled
          </Toggle>
        </div>
      </div> */}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Small</h4>
        <div className="flex gap-2">
          <Toggle size="sm">Toggle</Toggle>
          <Toggle size="sm">
            <Icon name="favorite" size={14} />
          </Toggle>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Default</h4>
        <div className="flex gap-2">
          <Toggle size="default">Toggle</Toggle>
          <Toggle size="default">
            <Icon name="favorite" size={16} />
          </Toggle>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Large</h4>
        <div className="flex gap-2">
          <Toggle size="lg">Toggle</Toggle>
          <Toggle size="lg">
            <Icon name="favorite" size={18} />
          </Toggle>
        </div>
      </div>
    </div>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toggle>
        <Icon name="format_bold" size={16} />
        Bold
      </Toggle>
      <Toggle>
        <Icon name="format_italic" size={16} />
        Italic
      </Toggle>
      <Toggle>
        <Icon name="format_underlined" size={16} />
        Underline
      </Toggle>
      <Toggle>
        <Icon name="format_strikethrough" size={16} />
        Strikethrough
      </Toggle>
      <Toggle>
        <Icon name="favorite" size={16} />
        Favorite
      </Toggle>
    </div>
  ),
};

export const IconOnlyVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Default variant</h4>
        <div className="flex gap-2">
          <Toggle>
            <Icon name="favorite" size={16} />
          </Toggle>
          <Toggle disabled>
            <Icon name="favorite" size={16} />
          </Toggle>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Outline Variant</h4>
        <div className="flex gap-2">
          <Toggle variant="outline">
            <Icon name="favorite" size={16} />
          </Toggle>
          <Toggle variant="outline" disabled>
            <Icon name="favorite" size={16} />
          </Toggle>
        </div>
      </div> */}
    </div>
  ),
};
