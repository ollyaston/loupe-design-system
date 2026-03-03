import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { SidebarNavSection } from "../../design-system/sidebar";
import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { SidebarContent } from "../../design-system/sidebar";
import type { NavItem } from "../../design-system/sidebar-nav-item";

const meta: Meta<typeof SidebarNavSection> = {
  component: SidebarNavSection,
  parameters: {
    docs: {
      description: {
        component:
          "A navigation section component that groups related navigation items together with an optional label. Provides a consistent structure for organizing sidebar navigation.",
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
type Story = StoryObj<typeof SidebarNavSection>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Agents",
        url: "/agents",
        gem: "agents",
        isVisible: true,
      },
      {
        title: "Customers",
        url: "/customers",
        gem: "customers",
        isVisible: true,
      },
      {
        title: "Orders",
        url: "/orders",
        gem: "orders",
        isVisible: true,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Workspace" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Home",
        url: "/",
        icon: "home",
        isVisible: true,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: "settings",
        isVisible: true,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
};

export const MultipleSections: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const workspaceItems: NavItem[] = [
      {
        title: "Agents",
        url: "/agents",
        gem: "agents",
        isVisible: true,
      },
      {
        title: "Customers",
        url: "/customers",
        gem: "customers",
        isVisible: true,
      },
    ];

    const operationsItems: NavItem[] = [
      {
        title: "Payments",
        url: "/payments",
        gem: "payments",
        isVisible: true,
      },
      {
        title: "Costs",
        url: "/costs",
        gem: "workflows",
        isVisible: true,
      },
    ];

    const settingsItems: NavItem[] = [
      {
        title: "API Keys",
        url: "/api-keys",
        icon: "api",
        isVisible: true,
      },
      {
        title: "Team",
        url: "/team",
        icon: "group_work",
        isVisible: true,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Workspace" navItems={workspaceItems} />
              <SidebarNavSection
                label="Operations"
                navItems={operationsItems}
              />
              <SidebarNavSection label="Settings" navItems={settingsItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
};

export const WithBetaBadges: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Blocks",
        url: "/blocks",
        gem: "blocks",
        beta: true,
        isVisible: true,
      },
      {
        title: "Events",
        url: "/events",
        gem: "events",
        beta: true,
        isVisible: true,
      },
      {
        title: "Quotes",
        url: "/quotes",
        gem: "quotes",
        beta: true,
        isVisible: true,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Beta features" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
};

export const WithExternalLinks: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Documentation",
        url: "https://docs.example.com",
        icon: "code",
        isVisible: true,
        externalLink: true,
      },
      {
        title: "Support",
        url: "https://support.example.com",
        icon: "help",
        isVisible: true,
        externalLink: true,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: "settings",
        isVisible: true,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Resources" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates external links mixed with internal links. External links display an arrow icon on the far right and open in a new tab.",
      },
    },
  },
};

export const WithHiddenItems: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Visible item",
        url: "/visible",
        gem: "agents",
        isVisible: true,
      },
      {
        title: "Hidden feature",
        url: "/hidden",
        gem: "blocks",
        isVisible: false,
      },
      {
        title: "Another visible item",
        url: "/another-visible",
        gem: "agents",
        isVisible: true,
      },
      {
        title: "Another hidden item",
        url: "/another-hidden",
        gem: "another",
        isVisible: false,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Workspace" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how items with `isVisible: false` are automatically filtered out and not rendered in the navigation section.",
      },
    },
  },
};

export const WithNestedItems: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Settings",
        icon: "settings",
        isVisible: true,
        items: [
          {
            title: "General",
            url: "/settings/general",
            icon: "settings",
            isVisible: true,
          },
          {
            title: "Team",
            url: "/settings/team",
            icon: "group_work",
            isVisible: true,
          },
          {
            title: "Billing",
            url: "/settings/billing",
            icon: "credit_card",
            isVisible: true,
          },
        ],
      },
      {
        title: "Workspace",
        gem: "agents",
        isVisible: true,
        items: [
          {
            title: "Agents",
            url: "/workspace/agents",
            gem: "agents",
            isVisible: true,
          },
          {
            title: "Customers",
            url: "/workspace/customers",
            gem: "customers",
            isVisible: true,
          },
        ],
      },
      {
        title: "Orders",
        url: "/orders",
        gem: "orders",
        isVisible: true,
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Navigation" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates nested navigation items. Items with nested sub-items can be expanded and collapsed by clicking. The chevron icon rotates when expanded. Nested items are rendered with indentation and a border.",
      },
    },
  },
};

export const MixedNestedAndRegular: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Home",
        url: "/",
        icon: "home",
        isVisible: true,
      },
      {
        title: "Workspace",
        gem: "agents",
        isVisible: true,
        items: [
          {
            title: "Agents",
            url: "/workspace/agents",
            gem: "agents",
            isVisible: true,
          },
          {
            title: "Customers",
            url: "/workspace/customers",
            gem: "customers",
            isVisible: true,
          },
        ],
      },
      {
        title: "Orders",
        url: "/orders",
        gem: "orders",
        isVisible: true,
      },
      {
        title: "Resources",
        icon: "code",
        isVisible: true,
        items: [
          {
            title: "Documentation",
            url: "https://docs.example.com",
            icon: "code",
            isVisible: true,
            externalLink: true,
          },
          {
            title: "Support",
            url: "https://support.example.com",
            icon: "help",
            isVisible: true,
            externalLink: true,
          },
        ],
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Main navigation" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates a mix of regular navigation items and items with nested sub-items. Both types can coexist in the same section.",
      },
    },
  },
};

export const WithNoIcons: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    const navItems: NavItem[] = [
      {
        title: "Dashboard",
        url: "/dashboard",
        isVisible: true,
      },
      {
        title: "Analytics",
        url: "/analytics",
        beta: true,
        isVisible: true,
      },
      {
        title: "Reports",
        url: "/reports",
        isVisible: true,
      },
      {
        title: "Account",
        isVisible: true,
        items: [
          {
            title: "Profile",
            url: "/account/profile",
            isVisible: true,
          },
          {
            title: "Preferences",
            url: "/account/preferences",
            isVisible: true,
          },
          {
            title: "Security",
            url: "/account/security",
            isVisible: true,
          },
        ],
      },
    ];

    return (
      <SidebarLayout
        open={open}
        onOpenChange={setOpen}
        enableHover={false}
        sidebarContent={
          <>
            <SidebarContent>
              <SidebarNavSection label="Navigation" navItems={navItems} />
            </SidebarContent>
          </>
        }
      >
        <div />
      </SidebarLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates navigation items without icons or gems. Items can be displayed with just text, and can still have beta badges, colors, and nested sub-items.",
      },
    },
  },
};
