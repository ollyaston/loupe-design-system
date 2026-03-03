import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Sheet } from "@/design-system/sheet";
import { Button } from "@/design-system/button";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Sheet> = {
  /* eslint-disable-next-line agent-loupe-ui/sentence-case -- Storybook section title uses category/component convention */
  title: "Modals and Popups/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slide-out panel component for forms, navigation, and secondary content.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Open sheet</Button>,
    title: "Edit profile",
    description:
      "Make changes to your profile here. Click save when you're done.",
    children: (
      <>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </>
    ),
    footer: <Button type="submit">Save changes</Button>,
  },
};

export const Side: Story = {
  args: {
    trigger: <Button variant="outline">Open side sheet</Button>,
    title: "Navigation",
    description: "Navigate through the application.",
    side: "left",
    children: (
      <>
        <div className="space-y-2">
          <div className="px-2 py-1 text-sm font-medium">Main</div>
          <div className="space-y-1">
            <div className="px-2 py-1 text-sm hover:bg-accent rounded">
              Dashboard
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded">
              Analytics
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded">
              Reports
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="px-2 py-1 text-sm font-medium">Settings</div>
          <div className="space-y-1">
            <div className="px-2 py-1 text-sm hover:bg-accent rounded">
              Profile
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded">
              Security
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded">
              Preferences
            </div>
          </div>
        </div>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    trigger: <Button variant="outline">Open small sheet</Button>,
    title: "Quick actions",
    description: "Small sheet for quick actions and simple forms.",
    width: "sm",
    children: (
      <>
        <div className="space-y-4">
          <div>
            <Label htmlFor="quick-action">Action</Label>
            <Input id="quick-action" placeholder="Enter action..." />
          </div>
        </div>
      </>
    ),
    footer: <Button>Save</Button>,
  },
};

export const Medium: Story = {
  args: {
    trigger: <Button variant="outline">Open medium sheet</Button>,
    title: "Edit settings",
    description: "Medium sheet for settings and configuration.",
    width: "md",
    children: (
      <>
        <div className="space-y-4">
          <div>
            <Label htmlFor="setting-name">Setting name</Label>
            <Input id="setting-name" value="My setting" />
          </div>
          <div>
            <Label htmlFor="setting-value">Value</Label>
            <Input id="setting-value" placeholder="Enter value..." />
          </div>
        </div>
      </>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button>Save settings</Button>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    trigger: <Button variant="outline">Open large sheet</Button>,
    title: "Project details",
    description: "View and edit project information.",
    width: "lg",
    children: (
      <>
        <div className="space-y-4">
          <div>
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" value="My awesome project" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] p-3 border border-input rounded-md"
              placeholder="Enter project description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start date</Label>
              <Input id="start-date" type="date" />
            </div>
            <div>
              <Label htmlFor="end-date">End date</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>
        </div>
      </>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </>
    ),
  },
};

export const ExtraLarge: Story = {
  args: {
    trigger: <Button variant="outline">Open extra large sheet</Button>,
    title: "Advanced configuration",
    description:
      "Extra large sheet for complex forms and detailed configuration.",
    width: "xl",
    children: (
      <>
        <div className="space-y-4">
          <div>
            <Label htmlFor="config-title">Configuration title</Label>
            <Input id="config-title" value="Advanced settings" />
          </div>
          <div>
            <Label htmlFor="config-description">Description</Label>
            <textarea
              id="config-description"
              className="w-full min-h-[120px] p-3 border border-input rounded-md"
              placeholder="Enter detailed description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="config-type">Type</Label>
              <Input id="config-type" placeholder="Configuration type..." />
            </div>
            <div>
              <Label htmlFor="config-priority">Priority</Label>
              <Input id="config-priority" type="number" placeholder="1-10" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="config-start">Start date</Label>
              <Input id="config-start" type="date" />
            </div>
            <div>
              <Label htmlFor="config-end">End date</Label>
              <Input id="config-end" type="date" />
            </div>
            <div>
              <Label htmlFor="config-status">Status</Label>
              <Input id="config-status" placeholder="Active/Inactive" />
            </div>
          </div>
        </div>
      </>
    ),
    footer: (
      <>
        <Button variant="outline">Reset</Button>
        <Button variant="outline">Cancel</Button>
        <Button>Save configuration</Button>
      </>
    ),
  },
};

export const Sidebar: Story = {
  args: {
    trigger: <Button variant="outline">Open sidebar sheet</Button>,
    title: "Navigation menu",
    description: "Sidebar width sheet for navigation and menus.",
    width: "sidebar",
    children: (
      <>
        <div className="space-y-2">
          <div className="px-2 py-1 text-sm font-medium">Main</div>
          <div className="space-y-1">
            <div className="px-2 py-1 text-sm hover:bg-accent rounded cursor-pointer">
              Dashboard
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded cursor-pointer">
              Analytics
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded cursor-pointer">
              Reports
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="px-2 py-1 text-sm font-medium">Settings</div>
          <div className="space-y-1">
            <div className="px-2 py-1 text-sm hover:bg-accent rounded cursor-pointer">
              Profile
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded cursor-pointer">
              Security
            </div>
            <div className="px-2 py-1 text-sm hover:bg-accent rounded cursor-pointer">
              Preferences
            </div>
          </div>
        </div>
      </>
    ),
  },
};
