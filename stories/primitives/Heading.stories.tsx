import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Heading } from "../../design-system/heading";
import { Container } from "@/components/layouts/container";
import { Button } from "../../design-system/button";
import { Search } from "../../design-system/search";
import { Badge } from "../../design-system/badge";
import {
  DropdownMenuWrapper,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../design-system/dropdown-menu";
import { Icon } from "../../design-system/icon";

const meta: Meta<typeof Heading> = {
  component: Heading,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "div", "span", "p"],
    },
    size: {
      control: { type: "select" },
      options: ["x-large", "large", "normal", "section"],
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    actionsContent: {
      control: { type: "text" },
    },
    badgeContent: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    title: "Dashboard overview",
    description: "Monitor your business metrics and performance",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Account preferences",
  },
};

export const LeftAligned: Story = {
  args: {
    align: "left",
    title: "Left aligned",
    description: "This heading is aligned to the left",
  },
};
export const CenterAligned: Story = {
  args: {
    align: "center",
    title: "Centered heading",
    description: "This heading is centered on the page",
  },
};

export const RightAligned: Story = {
  args: {
    align: "right",
    title: "Right aligned",
    description: "This heading is aligned to the right",
  },
};

export const XLargeSize: Story = {
  args: {
    size: "x-large",
    title: "Recent activity",
    description: "Latest updates from your team and customers",
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
    title: "Recent activity",
    description: "Latest updates from your team and customers",
  },
};

export const NormalSize: Story = {
  args: {
    size: "normal",
    title: "Recent activity",
    description: "Latest updates from your team and customers",
  },
};

export const SectionSize: Story = {
  args: {
    size: "section",
    title: "Recent activity",
    description: "Latest updates from your team and customers",
  },
};

export const CustomElement: Story = {
  args: {
    as: "h2",
    size: "large",
    title: "Large styling on H2 element",
    description:
      "This uses large styling but renders as an H2 element for semantic purposes",
  },
};

export const LongText: Story = {
  args: {
    size: "large",
    title:
      "This is a very long heading that demonstrates how the typography handles extended text content",
    description:
      "This description also demonstrates how longer text content is handled in the typography system, ensuring readability and proper spacing.",
  },
};

export const WithCustomPadding: Story = {
  args: {
    size: "large",
    title: "Heading with custom padding",
    description:
      "This heading has custom top and bottom padding applied via className",
    className: "py-8",
  },
};

export const WithSingleButton: Story = {
  args: {
    size: "section",
    title: "Dashboard overview",
    description: "Monitor your business metrics and performance",
    actionsContent: (
      <Button size="sm">
        <Icon name="add" size={16} />
        Add widget
      </Button>
    ),
  },
};

export const WithSearch: Story = {
  args: {
    size: "section",
    title: "Customer list",
    description: "Manage and view all your customers",
    actionsContent: (
      <Search placeholder="Search customers..." className="w-64" />
    ),
  },
};

export const WithMultipleButtons: Story = {
  args: {
    size: "section",
    title: "Project management",
    description: "Track progress and manage team tasks",
    actionsContent: (
      <>
        <Button variant="outline" size="sm">
          <Icon name="download" size={16} />
          Export
        </Button>
        <Button size="sm">
          <Icon name="add" size={16} />
          New project
        </Button>
      </>
    ),
  },
};

export const WithDropdownMenu: Story = {
  args: {
    size: "section",
    title: "Analytics dashboard",
    description: "View detailed analytics and reports",
    actionsContent: (
      <DropdownMenuWrapper>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Icon name="more_horiz" size={16} />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Icon name="download" size={16} />
            Export data
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="settings" size={16} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="share" size={16} />
            Share report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuWrapper>
    ),
  },
};

export const WithComplexActions: Story = {
  args: {
    size: "section",
    title: "Team workspace",
    description: "Collaborate with your team and manage projects efficiently",
    actionsContent: (
      <>
        <Search placeholder="Search workspace..." className="w-48" />
        <Button variant="outline" size="sm">
          <Icon name="filter_list" size={16} />
          Filter
        </Button>
        <DropdownMenuWrapper>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Icon name="more_horiz" size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Icon name="settings" size={16} />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="share" size={16} />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuWrapper>
        <Button size="sm">
          <Icon name="add" size={16} />
          Create
        </Button>
      </>
    ),
  },
};

export const WithBetaBadge: Story = {
  args: {
    size: "large",
    title: "AI analytics dashboard",
    description: "Advanced analytics powered by artificial intelligence",
    badgeContent: <Badge variant="secondary">Beta</Badge>,
  },
};

export const WithNewBadge: Story = {
  args: {
    size: "section",
    title: "Customer management",
    description: "Manage and view all your customers",
    badgeContent: <Badge variant="default">New</Badge>,
  },
};

export const WithBadgeAndActions: Story = {
  args: {
    size: "section",
    title: "Data analytics",
    description: "View detailed analytics and reports",
    badgeContent: <Badge variant="secondary">Beta</Badge>,
    actionsContent: (
      <>
        <Button variant="outline" size="sm">
          <Icon name="download" size={16} />
          Export
        </Button>
        <Button size="sm">
          <Icon name="add" size={16} />
          New report
        </Button>
      </>
    ),
  },
};

export const ExampleDashboard: Story = {
  args: {
    size: "x-large",
    title: "Analytics dashboard",
    description:
      "Monitor your business performance with real-time insights and detailed reports",
    badgeContent: <Badge variant="secondary">Beta</Badge>,
    actionsContent: (
      <>
        <Button variant="outline" size="sm">
          <Icon name="download" size={16} />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="settings" size={16} />
          Settings
        </Button>
        <Button size="sm">
          <Icon name="add" size={16} />
          New report
        </Button>
      </>
    ),
  },
};
