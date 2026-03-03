import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ToggleGroup } from "@/design-system/toggle-group";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    variant: {
      control: { type: "select" },
      options: ["default"], // "outline" commented out
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "bold", label: "Bold" },
      { value: "italic", label: "Italic" },
      { value: "underline", label: "Underline" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "left", icon: "left_panel_open" },
      { value: "center", icon: "home" },
      { value: "right", icon: "left_panel_closed" },
    ],
  },
};

export const WithIconsAndText: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "bold", icon: "format_bold", label: "Bold" },
      { value: "italic", icon: "format_italic", label: "Italic" },
      { value: "underline", icon: "format_underlined", label: "Underline" },
    ],
  },
};

// export const Outline: Story = {
//   args: {
//     type: "multiple",
//     variant: "outline",
//     children: (
//       <>
//         <ToggleGroupItem value="left">Left</ToggleGroupItem>
//         <ToggleGroupItem value="center">Center</ToggleGroupItem>
//         <ToggleGroupItem value="right">Right</ToggleGroupItem>
//       </>
//     ),
//   },
// };

// export const OutlineMultiple: Story = {
//   args: {
//     type: "multiple",
//     variant: "outline",
//     children: (
//       <>
//         <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
//         <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
//         <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
//       </>
//     ),
//   },
// };

export const Small: Story = {
  args: {
    type: "multiple",
    size: "sm",
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
};

export const Large: Story = {
  args: {
    type: "multiple",
    size: "lg",
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
};

export const SmallWithIcons: Story = {
  args: {
    type: "multiple",
    size: "sm",
    items: [
      { value: "bold", icon: "format_bold" },
      { value: "italic", icon: "format_italic" },
      { value: "underline", icon: "format_underlined" },
    ],
  },
};

export const LargeWithIcons: Story = {
  args: {
    type: "multiple",
    size: "lg",
    items: [
      { value: "bold", icon: "format_bold" },
      { value: "italic", icon: "format_italic" },
      { value: "underline", icon: "format_underlined" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    type: "multiple",
    disabled: true,
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
};

export const DisabledItem: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center", disabled: true },
      { value: "right", label: "Right" },
    ],
  },
};

export const AllVariants: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
};

export const AllSizes: Story = {
  args: {
    type: "multiple",
    size: "default",
    items: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
};

export const TextAlignmentExample: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "left", icon: "left_panel_open", label: "Left" },
      { value: "center", icon: "home", label: "Center" },
      { value: "right", icon: "left_panel_closed", label: "Right" },
    ],
  },
};

export const FormattingToolbarExample: Story = {
  args: {
    type: "multiple",
    items: [
      { value: "bold", icon: "format_bold", label: "Bold" },
      { value: "italic", icon: "format_italic", label: "Italic" },
      { value: "underline", icon: "format_underlined", label: "Underline" },
      {
        value: "strikethrough",
        icon: "format_strikethrough",
        label: "Strikethrough",
      },
    ],
  },
};

export const ViewToggleExample: Story = {
  args: {
    type: "multiple",
    size: "sm",
    items: [
      { value: "grid", icon: "home" },
      { value: "list", icon: "explore" },
      { value: "card", icon: "settings" },
    ],
  },
};
