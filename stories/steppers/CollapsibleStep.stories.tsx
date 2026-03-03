import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CollapsibleStep } from "@/design-system/collapsible-step";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof CollapsibleStep> = {
  component: CollapsibleStep,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    icon: {
      control: "text",
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    defaultOpen: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CollapsibleStep>;

export const Default: Story = {
  args: {
    title: "Basic step",
    description: "This is a basic collapsible step",
    icon: "circle",
    children: (
      <p className="text-sm text-muted-foreground">
        This is the collapsible content. You can put any content here.
      </p>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: "Configuration",
    description: "Configure your settings",
    icon: "settings",
    children: (
      <p className="text-sm text-muted-foreground">
        This is the collapsible content. You can put any content here.
      </p>
    ),
  },
};

export const WithQuickActions: Story = {
  args: {
    title: "Quick action step",
    description: "This step has quick actions instead of being collapsible",
    icon: "signals",
    quickActions: (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          <Icon name="edit" size={14} />
        </Button>
        <Button size="sm" variant="outline">
          <Icon name="delete" size={14} />
        </Button>
      </div>
    ),
  },
};

export const NoIcon: Story = {
  args: {
    title: "Step without icon",
    description: "This step doesn't have an icon",
    children: (
      <p className="text-sm text-muted-foreground">Content without an icon.</p>
    ),
  },
};

export const NoSubtitle: Story = {
  args: {
    title: "Simple step",
    icon: "swap_calls",
    children: (
      <p className="text-sm text-muted-foreground">
        A step with just a title and no subtitle.
      </p>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Pre-opened Step",
    description: "This step starts in the open state",
    icon: "blocks",
    defaultOpen: true,
    children: (
      <p className="text-sm text-muted-foreground">
        This content is visible by default.
      </p>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: "Extended details",
    description: "Additional content and options",
    icon: "expand_all",
    children: (
      <div>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Content goes here</p>
      </div>
    ),
  },
};

export const DisabledState: Story = {
  args: {
    title: "Disabled step",
    description: "This step is disabled",
    icon: "lock",
    backgroundColor: "gray",
    disabled: true,
    children: (
      <p className="text-sm text-muted-foreground">
        This content won&apos;t be visible when disabled.
      </p>
    ),
  },
};

export const MultipleSteps: Story = {
  render: () => (
    <div className="space-y-4">
      <CollapsibleStep
        title="First step"
        description="This is the first step in a sequence"
        icon="robot_2"
        backgroundColor="rosemary"
        defaultOpen={true}
      >
        <p className="text-sm text-muted-foreground">
          First step content goes here.
        </p>
      </CollapsibleStep>

      <CollapsibleStep
        title="Second step"
        description="This is the second step"
        icon="swap_calls"
        backgroundColor="pacific"
      >
        <p className="text-sm text-muted-foreground">
          Second step content goes here.
        </p>
      </CollapsibleStep>

      <CollapsibleStep
        title="Third step with actions"
        description="This step has quick actions"
        icon="signals"
        backgroundColor="coral"
        quickActions={
          <Button size="sm" variant="outline">
            Copy
          </Button>
        }
      />
    </div>
  ),
};
