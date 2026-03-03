import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IconBadge } from "@/design-system/icon-badge";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof IconBadge> = {
  component: IconBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <div className="flex flex-wrap gap-2">
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    icon: {
      control: "text",
      description: "Icon name (can be any Material Symbol or custom icon)",
    },
    size: {
      control: { type: "number", min: 16, max: 64, step: 4 },
      description: "Size of the icon badge in pixels",
    },
    backgroundColor: {
      control: "select",
      options: [
        "coral",
        "carmine",
        "earth",
        "sunglow",
        "yolk",
        "kiwi",
        "jade",
        "emerald",
        "azure",
        "rosemary",
        "pacific",
        "sapphire",
        "cerulean",
        "lavender",
        "amethyst",
        "plum",
        "orchid",
        "fawn",
        "eggplant",
        "pigeon",
        "granite",
        "clay",
        "brass",
        "cyanide",
      ],
      description: "Background color theme",
    },
    foregroundColor: {
      control: "select",
      options: [
        "coral",
        "carmine",
        "earth",
        "sunglow",
        "yolk",
        "kiwi",
        "jade",
        "emerald",
        "azure",
        "rosemary",
        "pacific",
        "sapphire",
        "cerulean",
        "lavender",
        "amethyst",
        "plum",
        "orchid",
        "fawn",
        "eggplant",
        "pigeon",
        "granite",
        "clay",
        "brass",
        "cyanide",
      ],
      description:
        "Foreground color theme (defaults to backgroundColor if not provided)",
    },
    darkMode: {
      control: "boolean",
      description: "Whether to use dark mode styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "home",
    size: 32,
    backgroundColor: "pacific",
  },
};

export const CustomIcon: Story = {
  args: {
    icon: "robot_2",
    size: 40,
    backgroundColor: "jade",
  },
};

export const MaterialSymbol: Story = {
  args: {
    icon: "favorite",
    size: 28,
    backgroundColor: "coral",
  },
};

export const DifferentColors: Story = {
  args: {
    icon: "settings",
    size: 32,
    backgroundColor: "amethyst",
    foregroundColor: "orchid",
  },
};

export const DarkMode: Story = {
  args: {
    icon: "code",
    size: 36,
    backgroundColor: "sapphire",
    darkMode: true,
  },
};

export const LargeSize: Story = {
  args: {
    icon: "shopping_bag",
    size: 48,
    backgroundColor: "earth",
  },
};

export const SmallSize: Story = {
  args: {
    icon: "attach_money",
    size: 20,
    backgroundColor: "emerald",
  },
};

// Showcase different icons and colors
export const Showcase: Story = {
  render: () => (
    <>
      <IconBadge icon="home" backgroundColor="pacific" size={32} />
      <IconBadge icon="settings" backgroundColor="jade" size={32} />
      <IconBadge icon="favorite" backgroundColor="coral" size={32} />
      <IconBadge icon="shopping_bag" backgroundColor="amethyst" size={32} />
      <IconBadge icon="attach_money" backgroundColor="yolk" size={32} />
      <IconBadge icon="code" backgroundColor="sapphire" size={32} />
      <IconBadge icon="robot_2" backgroundColor="orchid" size={32} />
      <IconBadge icon="account_circle" backgroundColor="rosemary" size={32} />
    </>
  ),
};

// Showcase with different sizes
export const SizeVariations: Story = {
  render: () => (
    <>
      <IconBadge icon="home" backgroundColor="pacific" size={20} />
      <IconBadge icon="home" backgroundColor="pacific" size={24} />
      <IconBadge icon="home" backgroundColor="pacific" size={32} />
      <IconBadge icon="home" backgroundColor="pacific" size={40} />
      <IconBadge icon="home" backgroundColor="pacific" size={48} />
      <IconBadge icon="home" backgroundColor="pacific" size={56} />
    </>
  ),
};

// Showcase without background (no backgroundColor prop)
export const WithoutBackground: Story = {
  args: {
    icon: "robot_2",
    size: 32,
    foregroundColor: "jade",
  },
};

// Showcase with background (backgroundColor prop provided)
export const WithBackground: Story = {
  args: {
    icon: "favorite",
    size: 32,
    backgroundColor: "coral",
  },
};

// Compare with and without background
export const BackgroundComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">
          Without background (no backgroundColor prop - full size icon)
        </h3>
        <div className="flex gap-2">
          <IconBadge icon="home" foregroundColor="pacific" size={32} />
          <IconBadge icon="settings" foregroundColor="jade" size={32} />
          <IconBadge icon="favorite" foregroundColor="coral" size={32} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">
          With background (backgroundColor prop provided - half size icon)
        </h3>
        <div className="flex gap-2">
          <IconBadge icon="home" backgroundColor="pacific" size={32} />
          <IconBadge icon="settings" backgroundColor="jade" size={32} />
          <IconBadge icon="favorite" backgroundColor="coral" size={32} />
        </div>
      </div>
    </div>
  ),
};
