import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/dialog";
import { Button } from "@/design-system/button";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";

const meta = {
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple dialog</DialogTitle>
          <DialogDescription>
            This is a simple dialog with just a title and description.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LargeContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Project details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Project overview</h4>
            <p className="text-sm text-muted-foreground">
              This project aims to create a comprehensive design system that can
              be used across multiple applications. It includes components,
              documentation, and guidelines for consistent user experience.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Key features</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Responsive design components</li>
              <li>• Accessibility compliance</li>
              <li>• Dark mode support</li>
              <li>• Customizable theming</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Timeline</h4>
            <p className="text-sm text-muted-foreground">
              Expected completion: Q2 2024
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Close</Button>
          <Button>Edit project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
