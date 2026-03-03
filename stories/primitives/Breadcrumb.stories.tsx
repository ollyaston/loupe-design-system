import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumb } from "@/design-system/breadcrumb";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Breadcrumb,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Breadcrumb" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Dashboard" }],
  },
};

export const SingleItemLarge: Story = {
  args: {
    items: [{ label: "Dashboard" }],
    size: "large",
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      // eslint-disable-next-line agent-loupe-ui/sentence-case
      { label: "Project Alpha", href: "/projects/123" },
      { label: "Tasks", href: "/projects/123/tasks" },
      { label: "Task details", href: "/projects/123/tasks/456" },
      { label: "Edit task" },
    ],
  },
};

export const LargeSize: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Breadcrumb" },
    ],
    size: "large",
  },
};
