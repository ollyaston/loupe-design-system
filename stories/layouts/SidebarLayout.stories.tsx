import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { DemoBanner } from "@/design-system/demo-banner";

const meta: Meta<typeof SidebarLayout> = {
  component: SidebarLayout,
  parameters: {
    docs: {
      description: {
        component:
          "A comprehensive sidebar layout with navigation, team switching, and user management.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarLayout>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={true}
        sidebarContent={<div className="p-4">Hello world</div>}
      >
        <div className="p-8">Sidebar content</div>
      </SidebarLayout>
    );
  },
};

export const InitiallyCollapsed: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={true}
        sidebarContent={<div className="p-4">Hello world</div>}
      >
        <div className="p-8">Sidebar content</div>
      </SidebarLayout>
    );
  },
};

export const WithDemoBanner: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={true}
        demoBanner={<DemoBanner />}
        sidebarContent={<div className="p-4">Hello world</div>}
      >
        <div className="p-8">Sidebar content </div>
      </SidebarLayout>
    );
  },
};
