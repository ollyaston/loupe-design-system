import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs } from "@/design-system/tabs";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "foo",
    tabs: [
      { value: "foo", label: "Foo", content: "Foo content" },
      { value: "bar", label: "Bar", content: "Bar content" },
    ],
  },
};

export const NoTabContentElement: Story = {
  args: {
    defaultValue: "foo",
    tabs: [
      { value: "foo", label: "Foo" },
      { value: "bar", label: "Bar" },
    ],
  },
};

export const WithNumberBadge: Story = {
  args: {
    defaultValue: "foo",
    tabs: [
      { value: "foo", label: "Foo", numberBadge: 0, content: "Foo content" },
      { value: "bar", label: "Bar", numberBadge: 200, content: "Bar content" },
    ],
  },
};

export const ManyTabs: Story = {
  args: {
    defaultValue: "overview",
    tabs: [
      { value: "overview", label: "Overview", content: "Overview content" },
      { value: "analytics", label: "Analytics", content: "Analytics content" },
      { value: "reports", label: "Reports", content: "Reports content" },
      { value: "settings", label: "Settings", content: "Settings content" },
      { value: "help", label: "Help", content: "Help content" },
      { value: "foo", label: "Foo", content: "Foo content" },
      { value: "bar", label: "Bar", content: "Bar content" },
      { value: "baz", label: "Baz", content: "Baz content" },
      { value: "qux", label: "Qux", content: "Qux content" },
      { value: "more", label: "More", content: "More content" },
    ],
  },
};

export const PillsStyle: Story = {
  args: {
    defaultValue: "account",
    tabStyle: "pills",
    tabs: [
      {
        value: "account",
        label: "Account",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Account settings</h3>
            <p className="text-muted-foreground">
              Manage your account preferences and profile information.
            </p>
          </div>
        ),
      },
      {
        value: "password",
        label: "Password",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Password settings</h3>
            <p className="text-muted-foreground">
              Update your password and security settings.
            </p>
          </div>
        ),
      },
      {
        value: "notifications",
        label: "Notifications",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Notification settings</h3>
            <p className="text-muted-foreground">
              Configure how you receive notifications.
            </p>
          </div>
        ),
      },
    ],
  },
};

export const UnderlineStyle: Story = {
  args: {
    defaultValue: "overview",
    tabStyle: "underline",
    tabs: [
      {
        value: "overview",
        label: "Overview",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="text-muted-foreground">
              Get a high-level view of your dashboard and key metrics.
            </p>
          </div>
        ),
      },
      {
        value: "analytics",
        label: "Analytics",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-muted-foreground">
              Deep dive into your data with detailed analytics and insights.
            </p>
          </div>
        ),
      },
      {
        value: "reports",
        label: "Reports",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Reports</h3>
            <p className="text-muted-foreground">
              Generate and view comprehensive reports for your business.
            </p>
          </div>
        ),
      },
      {
        value: "settings",
        label: "Settings",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="text-muted-foreground">
              Configure your application settings and preferences.
            </p>
          </div>
        ),
      },
    ],
  },
};

export const UnderlineWithBadges: Story = {
  args: {
    defaultValue: "inbox",
    tabStyle: "underline",
    tabs: [
      {
        value: "inbox",
        label: "Inbox",
        numberBadge: 3,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Inbox</h3>
            <p className="text-muted-foreground">
              You have 3 new messages in your inbox.
            </p>
          </div>
        ),
      },
      {
        value: "sent",
        label: "Sent",
        numberBadge: 12,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Sent</h3>
            <p className="text-muted-foreground">
              View your sent messages and delivery status.
            </p>
          </div>
        ),
      },
      {
        value: "drafts",
        label: "Drafts",
        numberBadge: 5,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Drafts</h3>
            <p className="text-muted-foreground">
              You have 5 draft messages waiting to be sent.
            </p>
          </div>
        ),
      },
      {
        value: "spam",
        label: "Spam",
        numberBadge: 1,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Spam</h3>
            <p className="text-muted-foreground">
              Review messages marked as spam.
            </p>
          </div>
        ),
      },
    ],
  },
};

export const DifferentSizes: Story = {
  args: {
    defaultValue: "small",
    tabs: [
      { value: "small", label: "Small", content: "Small tab content" },
      { value: "medium", label: "Medium", content: "Medium tab content" },
      { value: "large", label: "Large", content: "Large tab content" },
    ],
  },
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <Tabs {...args} size="sm" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <Tabs {...args} size="md" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <Tabs {...args} size="lg" />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    defaultValue: "tab1",
    fullWidth: true,
    tabs: [
      { value: "tab1", label: "Tab 1", content: "Tab 1 content" },
      { value: "tab2", label: "Tab 2", content: "Tab 2 content" },
      { value: "tab3", label: "Tab 3", content: "Tab 3 content" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    defaultValue: "preview",
    tabs: [
      { value: "preview", label: "Preview", content: "Preview content" },
      { value: "code", label: "Code", content: "Code content" },
      { value: "customize", label: "Customize", content: "Customize content" },
    ],
    actionsContent: (
      <Button variant="outline" size="sm">
        Reset
      </Button>
    ),
  },
};
