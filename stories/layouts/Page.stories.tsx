import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../../design-system/button";
import { Input } from "../../design-system/input";
import { PageWrapper as PageWrapperComponent } from "../../design-system/page-wrapper";
import { SidebarLayout } from "@/components/layouts/sidebar-layout";

const meta: Meta<typeof PageWrapperComponent> = {
  component: PageWrapperComponent,
  parameters: {
    docs: {
      description: {
        component: "Page is the root component for all pages in our app.",
      },
    },
  },
  tags: ["autodocs"],
  // TODO - move to single layout wrapper?
  decorators: [
    (Story) => (
      <SidebarLayout
        open={true}
        onOpenChange={() => {}}
        enableHover={false}
        sidebarContent={<div></div>}
      >
        <Story />
      </SidebarLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageWrapperComponent>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: "Customers", href: "/customers" },
      { label: "Customer" },
    ],
    title: "Page wrapper example",
    actions: <Button variant="secondary">Button</Button>,
    children: <div>Hello world</div>,
  },
};

export const BreadcrumbsOnly: Story = {
  args: {
    breadcrumbs: [
      { label: "Breadcrumbs", href: "/breadcrumbs" },
      { label: "Breadcrumb" },
    ],
    children: <div>Hello world</div>,
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Title only",
    children: <div>Hello world</div>,
  },
};

export const WithActions: Story = {
  args: {
    title: "With actions",
    actions: <Button variant="default">Button</Button>,
    children: <div>Hello world</div>,
  },
};

export const WithFooter: Story = {
  args: {
    title: "Page with footer",
    breadcrumbs: [
      { label: "Conversations", href: "/conversations" },
      { label: "Chat" },
    ],
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <p>Message {i + 1}</p>
            <p className="text-sm text-muted-foreground">
              This is some content to demonstrate scrolling behavior. The footer
              will remain pinned to the bottom.
            </p>
          </div>
        ))}
      </div>
    ),
    footerContent: (
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 max-w-[800px] mx-auto">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button>Send</Button>
        </div>
      </div>
    ),
  },
};
