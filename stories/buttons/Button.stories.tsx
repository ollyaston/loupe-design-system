import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button, ButtonGroupWrapper } from "../../design-system/button";
import { Icon } from "../../design-system/icon";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Buttons/Button",
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
type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructiveAlt">Destructive alt</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="default" size="2xs">
        2x small
      </Button>
      <Button variant="default" size="xs">
        Extra small
      </Button>
      <Button variant="default" size="sm">
        Small
      </Button>
      <Button variant="default" size="default">
        Default
      </Button>
      <Button variant="default" size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">
        <Icon name="builder" size={16} />
        Icon left
      </Button>
      <Button variant="default">
        Icon right
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="secondary">
        <Icon name="builder" size={16} />
        Secondary left
      </Button>
      <Button variant="secondary">
        Secondary right
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="outline">
        <Icon name="builder" size={16} />
        Outline left
      </Button>
      <Button variant="outline">
        Outline right
        <Icon name="builder" size={16} />
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default" size="icon">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="secondary" size="icon">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="destructive" size="icon">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="destructiveAlt" size="icon">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="outline" size="icon">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="ghost" size="icon">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="link" size="icon">
        <Icon name="builder" size={16} />
      </Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="default" size="2xs" aspectRatio="square">
        <Icon name="builder" size={12} />
      </Button>
      <Button variant="default" size="xs" aspectRatio="square">
        <Icon name="builder" size={14} />
      </Button>
      <Button variant="default" size="sm" aspectRatio="square">
        <Icon name="builder" size={14} />
      </Button>
      <Button variant="default" size="default" aspectRatio="square">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="default" size="lg" aspectRatio="square">
        <Icon name="builder" size={18} />
      </Button>
      <Button variant="secondary" size="2xs" aspectRatio="square">
        <Icon name="builder" size={12} />
      </Button>
      <Button variant="secondary" size="xs" aspectRatio="square">
        <Icon name="builder" size={14} />
      </Button>
      <Button variant="secondary" size="sm" aspectRatio="square">
        <Icon name="builder" size={14} />
      </Button>
      <Button variant="secondary" size="default" aspectRatio="square">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="secondary" size="lg" aspectRatio="square">
        <Icon name="builder" size={18} />
      </Button>
      <Button variant="outline" size="2xs" aspectRatio="square">
        <Icon name="builder" size={12} />
      </Button>
      <Button variant="outline" size="xs" aspectRatio="square">
        <Icon name="builder" size={14} />
      </Button>
      <Button variant="outline" size="sm" aspectRatio="square">
        <Icon name="builder" size={14} />
      </Button>
      <Button variant="outline" size="default" aspectRatio="square">
        <Icon name="builder" size={16} />
      </Button>
      <Button variant="outline" size="lg" aspectRatio="square">
        <Icon name="builder" size={18} />
      </Button>
    </div>
  ),
};

export const Square: Story = {
  args: {
    variant: "default",
    children: "B",
    aspectRatio: "square",
  },
};

export const BrandIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline" aspectRatio="square">
        <Icon name="gmail" size={20} />
      </Button>
      <Button variant="outline" aspectRatio="square">
        <Icon name="outlook" size={20} />
      </Button>
      <Button variant="outline" aspectRatio="square">
        <Icon name="google" size={20} />
      </Button>
      <Button variant="outline" aspectRatio="square">
        <Icon name="github" size={20} />
      </Button>
      <Button variant="outline" aspectRatio="square">
        <Icon name="windows" size={20} />
      </Button>
    </div>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button group wrapper</h3>
        <p className="text-sm text-muted-foreground">
          A wrapper component that displays buttons in a horizontal row with
          consistent spacing
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic button group</h4>
        <ButtonGroupWrapper>
          <Button variant="default">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonGroupWrapper>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Action group</h4>
        <ButtonGroupWrapper>
          <Button variant="default">
            <Icon name="builder" size={16} />
            Create
          </Button>
          <Button variant="outline">Edit</Button>
          <Button variant="destructiveAlt">Remove</Button>
        </ButtonGroupWrapper>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Destructive actions</h4>
        <ButtonGroupWrapper>
          <Button variant="destructiveAlt">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </ButtonGroupWrapper>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Icon only group</h4>
        <ButtonGroupWrapper>
          <Button variant="outline" size="icon">
            <Icon name="builder" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="builder" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="builder" size={16} />
          </Button>
        </ButtonGroupWrapper>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Mixed sizes</h4>
        <ButtonGroupWrapper>
          <Button variant="default" size="sm">
            Small
          </Button>
          <Button variant="default" size="default">
            Default
          </Button>
          <Button variant="default" size="lg">
            Large
          </Button>
        </ButtonGroupWrapper>
      </div>
    </div>
  ),
};

export const Waiting: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text button states</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" waiting>
            Loading...
          </Button>
          <Button variant="secondary" waiting>
            Secondary waiting
          </Button>
          <Button variant="outline" waiting>
            Outline waiting
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Buttons with icons</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" waiting>
            <Icon name="builder" size={16} />
            Save changes
          </Button>
          <Button variant="destructive" waiting>
            <Icon name="builder" size={16} />
            Delete item
          </Button>
          <Button variant="destructiveAlt" waiting>
            <Icon name="builder" size={16} />
            Remove item
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">All variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" waiting>
            Default waiting
          </Button>
          <Button variant="secondary" waiting>
            Secondary waiting
          </Button>
          <Button variant="destructive" waiting>
            Destructive waiting
          </Button>
          <Button variant="destructiveAlt" waiting>
            Destructive alt waiting
          </Button>
          <Button variant="outline" waiting>
            Outline waiting
          </Button>
          <Button variant="ghost" waiting>
            Ghost waiting
          </Button>
          <Button variant="link" waiting>
            Link waiting
          </Button>
        </div>
      </div>
    </div>
  ),
};
