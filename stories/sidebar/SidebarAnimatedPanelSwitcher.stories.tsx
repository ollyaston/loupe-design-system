import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { SidebarAnimatedPanelSwitcher } from "../../design-system/sidebar";
import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { Button } from "../../design-system/button";

const meta: Meta<typeof SidebarAnimatedPanelSwitcher> = {
  component: SidebarAnimatedPanelSwitcher,
  parameters: {
    docs: {
      description: {
        component:
          "An animated panel switcher component for transitioning between two sidebar panels with smooth fade and slide animations.",
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
type Story = StoryObj<typeof SidebarAnimatedPanelSwitcher>;

export const Default: Story = {
  render: () => {
    const [isOnSecondaryPanel, setIsOnSecondaryPanel] = React.useState(false);

    const mainPanel = (
      <div className="flex flex-col h-full p-4 items-center justify-center gap-4">
        <div className="text-lg font-semibold">Main panel</div>
        <Button
          onClick={() => setIsOnSecondaryPanel(true)}
          variant="secondary"
          size="sm"
        >
          Switch to secondary panel
        </Button>
      </div>
    );

    const secondaryPanel = (
      <div className="flex flex-col h-full p-4 items-center justify-center gap-4">
        <div className="text-lg font-semibold">Secondary panel</div>
        <Button
          onClick={() => setIsOnSecondaryPanel(false)}
          variant="secondary"
          size="sm"
        >
          Switch to main panel
        </Button>
      </div>
    );

    return (
      <SidebarLayout
        open={true}
        onOpenChange={() => {}}
        enableHover={false}
        sidebarContent={
          <SidebarAnimatedPanelSwitcher
            mainPanel={mainPanel}
            secondaryPanel={secondaryPanel}
            isOnSecondaryPanel={isOnSecondaryPanel}
          />
        }
      >
        <div />
      </SidebarLayout>
    );
  },
};
