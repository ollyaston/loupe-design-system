import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar, AvatarGroup } from "../../design-system/avatar";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Avatar component for displaying user profile images with fallback support.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container>
        <div className="flex flex-wrap gap-4 p-4">
          <Story />
        </div>
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    alt: "John Doe",
  },
};

export const WithFallback: Story = {
  args: {
    src: "/broken-image.jpg",
    alt: "John Doe",
  },
};

export const FallbackOnly: Story = {
  args: {
    alt: "Jane Doe",
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <>
      <Avatar
        size="xs"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar
        size="md"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
    </>
  ),
};

export const MultipleAvatars: Story = {
  render: () => (
    <>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
      <Avatar alt="John Doe" />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
    </>
  ),
};

export const AvatarGroupBasic: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
      <Avatar alt="John Doe" />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
    </AvatarGroup>
  ),
};

export const AvatarGroupWithMax: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
      <Avatar alt="John Doe" />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        alt="Jane Doe"
      />
    </AvatarGroup>
  ),
};

export const AvatarGroupDifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Jane Doe"
        />
        <Avatar alt="John Doe" />
      </AvatarGroup>
      <AvatarGroup size="lg">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Jane Doe"
        />
        <Avatar alt="John Doe" />
      </AvatarGroup>
    </div>
  ),
};
