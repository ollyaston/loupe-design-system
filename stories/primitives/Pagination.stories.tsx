import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Pagination } from "../../design-system/pagination";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
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
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const WithEllipsis: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 3,
    totalPages: 3,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const LargeDataset: Story = {
  args: {
    currentPage: 26,
    totalPages: 50,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const Compact: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    compact: true,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const WithCallbacks: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log("Page changed to:", page),
    onPrevious: () => console.log("Previous clicked"),
    onNext: () => console.log("Next clicked"),
  },
};

export const NoEllipsis: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showEllipsis: false,
    pageHref: (page) => `#${page}`,
    previousHref: "#",
    nextHref: "#",
  },
};

export const NoNavigation: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    showPrevious: false,
    showNext: false,
    pageHref: (page) => `#${page}`,
  },
};
