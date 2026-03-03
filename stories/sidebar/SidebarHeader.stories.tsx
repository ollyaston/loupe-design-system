import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SidebarTopHeader } from "@/design-system/sidebar-top-header";
import { Icon } from "@/design-system/icon";

const meta: Meta<typeof SidebarTopHeader> = {
  component: SidebarTopHeader,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title to display in the header",
    },
    onBackClick: {
      action: "back-clicked",
      description: "Callback when back button is clicked",
    },
    backHref: {
      control: "text",
      description:
        "URL to navigate to when back button is clicked (if onBackClick is not provided)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the header",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: "Chat header",
    onBackClick: () => console.log("Back clicked"),
  },
};

export const WithBackHref: Story = {
  args: {
    title: "Generate block",
    backHref: "/blocks",
  },
};

export const WithActions: Story = {
  args: {
    title: "Project settings",
    onBackClick: () => console.log("Back clicked"),
    actions: [
      {
        icon: <Icon name="search" size={16} />,
        onClick: () => console.log("Search clicked"),
        tooltip: "Search",
      },
      {
        icon: <Icon name="notifications" size={16} />,
        onClick: () => console.log("Notifications clicked"),
        tooltip: "Notifications",
      },
    ],
  },
};

export const WithCustomHeader: Story = {
  args: {
    picker: (
      <div className="flex items-center py-1 px-2 bg-background">Acme corp</div>
    ),
    actions: [
      {
        icon: <Icon name="settings" size={16} />,
        onClick: () => console.log("Settings clicked"),
        tooltip: "Settings",
      },
    ],
  },
};

export const WithoutBackButton: Story = {
  args: {
    title: "Dashboard",
    actions: [
      {
        icon: <Icon name="search" size={16} />,
        onClick: () => console.log("Search clicked"),
        tooltip: "Search",
      },
    ],
    onBackClick: undefined, // Not sure why this is needed
  },
};

export const LongTitle: Story = {
  args: {
    title: "This is a very long title that might wrap to multiple lines",
    onBackClick: () => console.log("Back clicked"),
  },
};

export const MultipleActions: Story = {
  args: {
    title: "Document editor",
    onBackClick: () => console.log("Back clicked"),
    actions: [
      {
        icon: <Icon name="search" size={16} />,
        onClick: () => console.log("Search clicked"),
        tooltip: "Search",
      },
      {
        icon: <Icon name="notifications" size={16} />,
        onClick: () => console.log("Notifications clicked"),
        tooltip: "Notifications",
      },
      {
        icon: <Icon name="settings" size={16} />,
        onClick: () => console.log("Settings clicked"),
        tooltip: "Settings",
      },
    ],
  },
};
