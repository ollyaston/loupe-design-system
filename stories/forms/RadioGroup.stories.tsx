import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RadioGroup } from "@/design-system/radio-group";
import { FormField } from "@/design-system/form-field";
import { Container } from "@/components/layouts/container";

const meta = {
  component: RadioGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </Container>
    ),
  ],
  args: {
    size: "md",
    orientation: "vertical",
    showBorder: false,
    showRadio: true,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Radio Group Stories
export const Default: Story = {
  args: {
    defaultValue: "option-one",
    choices: [
      { value: "option-one", title: "Yes, send me notifications" },
      { value: "option-two", title: "No, I don't want notifications" },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    defaultValue: "comfortable",
    choices: [
      { value: "default", title: "Default" },
      { value: "comfortable", title: "Comfortable" },
      { value: "compact", title: "Compact" },
    ],
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    defaultValue: "basic",
    choices: [
      {
        value: "basic",
        title: "Basic plan",
        description: "Perfect for getting started",
      },
      {
        value: "pro",
        title: "Pro plan",
        description: "Advanced features for power users",
      },
      {
        value: "enterprise",
        title: "Enterprise plan",
        description: "Full-featured solution for large teams",
      },
    ],
  },
};

export const WithFormField: Story = {
  args: {
    defaultValue: "comfortable",
    choices: [
      { value: "default", title: "Default" },
      { value: "comfortable", title: "Comfortable" },
      { value: "compact", title: "Compact" },
    ],
  },
  render: (args) => (
    <FormField
      label="Select your preferred spacing"
      required
      description="Choose the spacing that works best for your workflow."
    >
      <RadioGroup {...args} />
    </FormField>
  ),
};

export const MultipleOptions: Story = {
  args: {
    defaultValue: "option-1",
    choices: [
      { value: "option-1", title: "Red" },
      { value: "option-2", title: "Blue" },
      { value: "option-3", title: "Green" },
      { value: "option-4", title: "Yellow" },
      { value: "option-5", title: "Purple" },
    ],
  },
};

export const HorizontalLayout: Story = {
  args: {
    orientation: "horizontal",
    defaultValue: "option-1",
    choices: [
      { value: "option-1", title: "Red" },
      { value: "option-2", title: "Blue" },
      { value: "option-3", title: "Green" },
    ],
  },
};

// Icon-based selection stories
export const WithIcons: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    defaultValue: "circle",
    choices: [
      { value: "circle", icon: "circle", title: "Circle" },
      { value: "crop_square", icon: "crop_square", title: "Square" },
      { value: "hexagon", icon: "hexagon", title: "Hexagon" },
      { value: "change_history", icon: "change_history", title: "Triangle" },
      { value: "kid_star", icon: "kid_star", title: "Star" },
    ],
  },
};

export const WithIconsSmall: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    size: "sm",
    defaultValue: "circle",
    choices: [
      { value: "circle", icon: "circle", title: "Circle" },
      { value: "crop_square", icon: "crop_square", title: "Square" },
      { value: "hexagon", icon: "hexagon", title: "Hexagon" },
      { value: "change_history", icon: "change_history", title: "Triangle" },
      { value: "kid_star", icon: "kid_star", title: "Star" },
    ],
  },
};

export const WithIconsLarge: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    size: "lg",
    defaultValue: "circle",
    choices: [
      { value: "circle", icon: "circle", title: "Circle" },
      { value: "crop_square", icon: "crop_square", title: "Square" },
      { value: "hexagon", icon: "hexagon", title: "Hexagon" },
      { value: "change_history", icon: "change_history", title: "Triangle" },
      { value: "kid_star", icon: "kid_star", title: "Star" },
    ],
  },
};

export const WithIconsHorizontalLayout: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    orientation: "horizontal",
    defaultValue: "circle",
    choices: [
      { value: "circle", icon: "circle", title: "Circle" },
      { value: "crop_square", icon: "crop_square", title: "Square" },
      { value: "hexagon", icon: "hexagon", title: "Hexagon" },
    ],
  },
};

export const WithIconsNoText: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    defaultValue: "option1",
    choices: [
      { value: "option1", title: "Option 1" },
      { value: "option2", title: "Option 2" },
      { value: "option3", title: "Option 3" },
      { value: "option4", title: "Option 4" },
    ],
  },
};

export const WithIconsSmallNoText: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    size: "sm",
    defaultValue: "option1",
    choices: [
      { value: "option1", title: "Option 1" },
      { value: "option2", title: "Option 2" },
      { value: "option3", title: "Option 3" },
      { value: "option4", title: "Option 4" },
    ],
  },
};

export const WithIconsLargeNoText: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    size: "lg",
    defaultValue: "option1",
    choices: [
      { value: "option1", title: "Option 1" },
      { value: "option2", title: "Option 2" },
      { value: "option3", title: "Option 3" },
      { value: "option4", title: "Option 4" },
    ],
  },
};

// Box-based selection stories
export const WithBoxes: Story = {
  args: {
    showBorder: true,
    defaultValue: "starter",
    choices: [
      {
        value: "starter",
        title: "Starter plan",
        description:
          "Perfect for small businesses getting started with our platform",
      },
      {
        value: "pro",
        title: "Pro plan",
        description:
          "Advanced features for growing businesses with higher demands",
      },
    ],
  },
};

export const WithBoxesThreeOptions: Story = {
  args: {
    showBorder: true,
    defaultValue: "basic",
    choices: [
      {
        value: "basic",
        title: "Basic plan",
        description: "Essential features for individuals and small teams",
      },
      {
        value: "professional",
        title: "Professional plan",
        description: "Advanced tools for growing businesses and teams",
      },
      {
        value: "enterprise",
        title: "Enterprise plan",
        description: "Full-featured solution for large organizations",
      },
    ],
  },
};

export const WithBoxesHorizontalLayout: Story = {
  args: {
    showBorder: true,
    orientation: "horizontal",
    defaultValue: "monthly",
    choices: [
      {
        value: "monthly",
        title: "Monthly",
        description: "Pay monthly with no long-term commitment",
      },
      {
        value: "yearly",
        title: "Yearly",
        description: "Save 20% with annual billing",
      },
    ],
  },
};

export const WithBoxesNoRadio: Story = {
  args: {
    showBorder: true,
    showRadio: false,
    defaultValue: "starter",
    choices: [
      {
        value: "starter",
        title: "Starter plan",
        description:
          "Perfect for small businesses getting started with our platform",
      },
      {
        value: "pro",
        title: "Pro plan",
        description:
          "Advanced features for growing businesses with higher demands",
      },
    ],
  },
};

export const WithBoxesWithDisabledOption: Story = {
  args: {
    showBorder: true,
    defaultValue: "starter",
    choices: [
      {
        value: "starter",
        title: "Starter plan",
        description:
          "Perfect for small businesses getting started with our platform",
      },
      {
        value: "pro",
        title: "Pro plan",
        description:
          "Advanced features for growing businesses with higher demands",
      },
      {
        value: "enterprise",
        title: "Enterprise plan",
        description: "Full-featured solution for large organizations",
        disabled: true,
      },
    ],
  },
};

export const WithBoxesLongDescriptions: Story = {
  args: {
    showBorder: true,
    defaultValue: "free",
    choices: [
      {
        value: "free",
        title: "Free tier",
        description:
          "Get started with basic features and limited usage. Perfect for trying out our platform and small personal projects.",
      },
      {
        value: "premium",
        title: "Premium plan",
        description:
          "Unlock advanced features, priority support, and higher usage limits. Ideal for professional users and growing businesses.",
      },
    ],
  },
};

export const WithError: Story = {
  args: {
    defaultValue: "credit",
    error: true,
    choices: [
      { value: "credit", title: "Credit card" },
      { value: "debit", title: "Debit card" },
      { value: "paypal", title: "PayPal" },
    ],
  },
};

export const WithBoxesError: Story = {
  args: {
    showBorder: true,
    defaultValue: "starter",
    error: true,
    choices: [
      {
        value: "starter",
        title: "Starter plan",
        description:
          "Perfect for small businesses getting started with our platform",
      },
      {
        value: "pro",
        title: "Pro plan",
        description:
          "Advanced features for growing businesses with higher demands",
      },
    ],
  },
};
