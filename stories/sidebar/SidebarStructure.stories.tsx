import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/design-system/sidebar";

const meta: Meta = {
  title: "Sidebar/SidebarStructure",
  parameters: {
    docs: {
      description: {
        component:
          "Demonstrates the complete sidebar structure with SidebarHeader, SidebarContent, and SidebarFooter components within a SidebarLayout.",
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
type Story = StoryObj<typeof meta>;

export const CompleteSidebar: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={true}
        sidebarContent={
          <>
            <SidebarHeader>
              <div className="w-full h-full border-2 border-destructive text-destructive font-semibold flex items-center justify-center">
                SidebarHeader
              </div>
            </SidebarHeader>
            <SidebarContent>
              <div className="w-full h-full border-2 border-destructive text-destructive font-semibold flex items-center justify-center">
                SidebarContent
              </div>
            </SidebarContent>
            <SidebarFooter>
              <div className="w-full h-full border-2 border-destructive text-destructive font-semibold flex items-center justify-center">
                SidebarFooter
              </div>
            </SidebarFooter>
          </>
        }
      >
        <div className="p-8 text-muted-foreground">
          This is the main content area
        </div>
      </SidebarLayout>
    );
  },
};
