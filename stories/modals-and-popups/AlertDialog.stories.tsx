import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { AlertDialog } from "@/design-system/alert-dialog";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";
import { Icon } from "@/design-system/icon";

const meta = {
  component: AlertDialog,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerContent: <Button variant="outline">Delete account</Button>,
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    cancelText: "Cancel",
    onCancelClick: () => console.log("cancel"),
    actionText: "Continue",
    onActionClick: () => console.log("action"),
  },
};

export const Destructive: Story = {
  args: {
    triggerContent: <Button variant="destructive">Delete project</Button>,
    title: "Delete project",
    description:
      "Are you sure you want to delete this project? This action cannot be undone.",
    cancelText: "Cancel",
    onCancelClick: () => console.log("cancel"),
    actionText: "Delete",
    onActionClick: () => console.log("action"),
    variant: "destructive",
  },
};

export const WithCustomContent: Story = {
  args: {
    triggerContent: <Button variant="outline">Show details</Button>,
    title: "Important information",
    description:
      "This dialog contains important information that requires your attention.",
    cancelText: "Close",
    onCancelClick: () => console.log("cancel"),
    actionText: "Proceed",
    onActionClick: () => console.log("action"),
    children: (
      <div className="py-4">
        <p className="text-sm text-muted-foreground">
          Here is some additional content that might be important for the user
          to see.
        </p>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm font-medium">Key points:</p>
          <ul className="mt-2 text-sm space-y-1">
            <li>• First important point</li>
            <li>• Second important point</li>
            <li>• Third important point</li>
          </ul>
        </div>
      </div>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    triggerContent: <Button variant="outline">Show warning</Button>,
    icon: <Icon name="info" size={16} />,
    variant: "normal",
    title: "Warning",
    description:
      "This action may have unintended consequences. Please review before proceeding.",
    cancelText: "Cancel",
    onCancelClick: () => console.log("cancel"),
    actionText: "Continue anyway",
    onActionClick: () => console.log("action"),
  },
};

export const WithCustomIcon: Story = {
  args: {
    triggerContent: <Button variant="outline">Show alert</Button>,
    icon: <Icon name="warning" size={16} />,
    variant: "destructive",
    title: "Critical alert",
    description:
      "This is a critical warning that requires immediate attention.",
    cancelText: "Dismiss",
    onCancelClick: () => console.log("cancel"),
    actionText: "Take action",
    onActionClick: () => console.log("action"),
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open controlled dialog</Button>
        <AlertDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    );
  },
  args: {
    title: "Controlled dialog",
    description:
      "This dialog is controlled by the open and onOpenChange props.",
    cancelText: "Cancel",
    onCancelClick: () => console.log("cancel"),
    actionText: "Confirm",
    onActionClick: () => console.log("action"),
  },
};
