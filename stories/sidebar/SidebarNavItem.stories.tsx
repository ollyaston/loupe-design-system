import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
  SidebarNavItem,
  type NavItem,
} from "../../design-system/sidebar-nav-item";

const meta: Meta<typeof SidebarNavItem> = {
  component: SidebarNavItem,
  parameters: {
    docs: {
      description: {
        component:
          "A navigation item component designed for use within a sidebar. Supports icons, gems, badges, nested sub-items with expand/collapse functionality, and accessibility states.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-64 bg-sidebar text-sidebar-foreground">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarNavItem>;

export const Default: Story = {
  args: {
    item: {
      title: "Home",
      url: "/",
      icon: "home",
      isVisible: true,
    },
  },
};

export const NoIcon: Story = {
  args: {
    item: {
      title: "Dashboard",
      url: "/dashboard",
      isVisible: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Navigation items can be displayed without icons or gems, showing only the text label.",
      },
    },
  },
};

export const NoIconWithBeta: Story = {
  args: {
    item: {
      title: "Analytics",
      url: "/analytics",
      beta: true,
      isVisible: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Items without icons or gems can still have beta badges and other features.",
      },
    },
  },
};

export const WithGem: Story = {
  args: {
    item: {
      title: "Agents",
      url: "/agents",
      gem: "agents",
      isVisible: true,
    },
  },
};

export const WithBetaBadge: Story = {
  args: {
    item: {
      title: "Blocks",
      url: "/blocks",
      gem: "blocks",
      beta: true,
      isVisible: true,
    },
  },
};

export const MultipleItems: Story = {
  render: () => {
    const items: NavItem[] = [
      { title: "Tokens", url: "/tokens", gem: "credits", isVisible: true },
      {
        title: "Customers",
        url: "/customers",
        gem: "customers",
        isVisible: true,
      },
      { title: "Blocks", url: "/blocks", gem: "blocks", isVisible: true },
      { title: "Signals", url: "/signals", gem: "signals", isVisible: true },
      { title: "Agents", url: "/agents", gem: "agents", isVisible: true },
      { title: "Orders", url: "/orders", gem: "orders", isVisible: true },
      { title: "Vendors", url: "/vendors", gem: "vendors", isVisible: true },
      { title: "Invoices", url: "/invoice", gem: "invoices", isVisible: true },
      {
        title: "Simulations",
        url: "/simulations",
        gem: "simulations",
        isVisible: true,
      },
      { title: "Payments", url: "/payments", gem: "payments", isVisible: true },
      {
        title: "Team",
        url: "/team",
        icon: "group_work",
        isVisible: true,
      },
      {
        title: "Billing",
        url: "/billing",
        icon: "credit_card",
        isVisible: true,
      },
    ];

    return (
      <>
        {items.map((item, index) => (
          <SidebarNavItem key={index} item={item} />
        ))}
      </>
    );
  },
};

export const ExternalLink: Story = {
  args: {
    item: {
      title: "Documentation",
      url: "https://docs.example.com",
      icon: "code",
      isVisible: true,
      externalLink: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "External links open in a new tab and display an arrow icon on the far right side.",
      },
    },
  },
};

export const ExternalLinkWithBeta: Story = {
  args: {
    item: {
      title: "Support",
      url: "https://support.example.com",
      icon: "help",
      isVisible: true,
      externalLink: true,
      beta: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "External links can also have beta badges. The arrow icon appears after the badge.",
      },
    },
  },
};

export const Hidden: Story = {
  args: {
    item: {
      title: "Hidden item",
      url: "/hidden",
      icon: "settings",
      isVisible: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `isVisible` is `false`, the component returns an empty fragment and does not render anything.",
      },
    },
  },
};

export const WithNestedItems: Story = {
  args: {
    item: {
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
  },
  parameters: {
    docs: {
      description: {
        story:
          "Items with nested sub-items can be expanded and collapsed by clicking. The chevron icon rotates when expanded. Parent items with nested items should not have URLs.",
      },
    },
  },
};

export const WithNestedItemsAndGems: Story = {
  args: {
    item: {
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
        {
          title: "Orders",
          url: "/workspace/orders",
          gem: "orders",
          isVisible: true,
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Nested items can use gems and colors just like parent items. The parent item displays a chevron icon to indicate it's expandable. Parent items with nested items should not have URLs.",
      },
    },
  },
};

export const WithNestedItemsAndBeta: Story = {
  args: {
    item: {
      title: "Beta features",
      icon: "science",
      isVisible: true,
      items: [
        {
          title: "Blocks",
          url: "/beta/blocks",
          gem: "blocks",
          beta: true,
          isVisible: true,
        },
        {
          title: "Events",
          url: "/beta/events",
          gem: "events",
          beta: true,
          isVisible: true,
        },
        {
          title: "Quotes",
          url: "/beta/quotes",
          gem: "quotes",
          beta: true,
          isVisible: true,
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Nested items can have beta badges. Both parent and child items can display badges independently. Parent items with nested items should not have URLs.",
      },
    },
  },
};

export const WithNestedExternalLinks: Story = {
  args: {
    item: {
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
        {
          title: "Internal page",
          url: "/resources/internal",
          icon: "home",
          isVisible: true,
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Nested items can include external links mixed with internal links. External links display an arrow icon and open in a new tab. Parent items with nested items should not have URLs.",
      },
    },
  },
};

export const WithHiddenNestedItems: Story = {
  args: {
    item: {
      title: "Products",
      gem: "products",
      isVisible: true,
      items: [
        {
          title: "Visible product",
          url: "/products/visible",
          gem: "products",
          isVisible: true,
        },
        {
          title: "Hidden product",
          url: "/products/hidden",
          gem: "products",
          isVisible: false,
        },
        {
          title: "Another visible product",
          url: "/products/another",
          gem: "products",
          isVisible: true,
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Hidden nested items (with `isVisible: false`) are automatically filtered out and not rendered. Only visible nested items appear when the parent is expanded. Parent items with nested items should not have URLs.",
      },
    },
  },
};

export const WithNestedItemsNoIcons: Story = {
  args: {
    item: {
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
  },
  parameters: {
    docs: {
      description: {
        story:
          "Nested items can also be displayed without icons or gems. Both parent and child items can be text-only. Parent items with nested items should not have URLs.",
      },
    },
  },
};
