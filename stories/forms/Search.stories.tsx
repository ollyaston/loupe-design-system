import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Search } from "@/design-system/search";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Search,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search test...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Search disabled...",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Search with error...",
    error: true,
  },
};
