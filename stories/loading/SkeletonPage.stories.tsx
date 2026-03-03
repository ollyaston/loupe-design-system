import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SkeletonPage } from "@/design-system/skeleton-page";
import { PageWrapper } from "@/design-system/page-wrapper";
import { Container } from "@/components/layouts/container";
import { SidebarLayout } from "@/components/layouts/sidebar-layout";

const meta = {
  component: SkeletonPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-0">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    showHeader: {
      control: "boolean",
      description: "Whether to show the page header",
    },
    showBreadcrumbs: {
      control: "boolean",
      description: "Whether to show breadcrumbs in header",
    },
    showTitle: {
      control: "boolean",
      description: "Whether to show title in header",
    },
    showActions: {
      control: "boolean",
      description: "Whether to show action buttons in header",
    },
    showContent: {
      control: "boolean",
      description: "Whether to show main content area",
    },
    showSidebar: {
      control: "boolean",
      description: "Whether to show sidebar",
    },
  },
} satisfies Meta<typeof SkeletonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showHeader: true,
    showBreadcrumbs: true,
    showTitle: true,
    showActions: true,
    showContent: true,
    showSidebar: false,
  },
};

export const WithSidebar: Story = {
  args: {
    showHeader: true,
    showBreadcrumbs: true,
    showTitle: true,
    showActions: true,
    showContent: true,
    showSidebar: true,
  },
};

export const TitleHeader: Story = {
  args: {
    showHeader: true,
    showBreadcrumbs: false,
    showTitle: true,
    showActions: true,
    showContent: true,
    showSidebar: false,
  },
};

export const MiniLayout: Story = {
  args: {
    showHeader: true,
    showBreadcrumbs: false,
    showTitle: true,
    showActions: true,
    showContent: true,
    showSidebar: false,
  },
};

export const ContentOnly: Story = {
  args: {
    showHeader: false,
    showBreadcrumbs: false,
    showTitle: false,
    showActions: false,
    showContent: true,
    showSidebar: false,
  },
};

export const WithPageWrapper: Story = {
  render: () => (
    <SidebarLayout
      open={false}
      onOpenChange={() => {}}
      enableHover={false}
      sidebarContent={<div></div>}
    >
      <PageWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analytics" },
        ]}
        title="Analytics dashboard"
      >
        <SkeletonPage
          showHeader={false}
          showContent={true}
          showSidebar={true}
        />
      </PageWrapper>
    </SidebarLayout>
  ),
};

export const WithPageWrapperMini: Story = {
  render: () => (
    <SidebarLayout
      open={false}
      onOpenChange={() => {}}
      enableHover={false}
      sidebarContent={<></>}
    >
      <PageWrapper title="Settings">
        <SkeletonPage
          showHeader={false}
          showContent={true}
          showSidebar={false}
        />
      </PageWrapper>
    </SidebarLayout>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <SidebarLayout
      open={false}
      onOpenChange={() => {}}
      enableHover={false}
      sidebarContent={<></>}
    >
      <PageWrapper
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
        title="Dashboard"
        beta={true}
      >
        <SkeletonPage
          showHeader={false}
          showContent={true}
          showSidebar={true}
        />
      </PageWrapper>
    </SidebarLayout>
  ),
};
