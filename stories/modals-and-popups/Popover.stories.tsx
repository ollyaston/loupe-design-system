import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "@/design-system/icon";
import { useState } from "react";

import { Popover } from "@/design-system/popover";
import { Button } from "@/design-system/button";
import { Calendar } from "@/design-system/calendar";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Popover,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover
      triggerContent={
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <Icon name="calendar_today" size={16} />
          Pick a date
        </Button>
      }
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="single"
        selected={new Date()}
        onSelect={() => {}}
        initialFocus
      />
    </Popover>
  ),
} as unknown as Story;

export const Simple = {
  render: () => (
    <Popover triggerContent={<Button variant="outline">Click me</Button>}>
      <div className="space-y-2">
        <h4 className="font-medium">Simple popover</h4>
        <p className="text-sm text-muted-foreground">
          This is a simple popover with some content.
        </p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const WithContent: Story = {
  render: () => (
    <Popover
      triggerContent={<Button variant="outline">Open popover</Button>}
      className="w-80"
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="width">Width</label>
            <input
              id="width"
              defaultValue="100%"
              className="col-span-2 h-8 px-3 text-sm border border-input bg-background rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="maxWidth">Max. width</label>
            <input
              id="maxWidth"
              defaultValue="300px"
              className="col-span-2 h-8 px-3 text-sm border border-input bg-background rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="height">Height</label>
            <input
              id="height"
              defaultValue="25px"
              className="col-span-2 h-8 px-3 text-sm border border-input bg-background rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="maxHeight">Max. height</label>
            <input
              id="maxHeight"
              defaultValue="none"
              className="col-span-2 h-8 px-3 text-sm border border-input bg-background rounded-md"
            />
          </div>
        </div>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const Align: Story = {
  render: () => (
    <div className="flex justify-center gap-4">
      <Popover
        triggerContent={<Button variant="outline">Align start</Button>}
        align="start"
      >
        <div className="p-2">
          <p className="text-sm">Popover aligned to start</p>
        </div>
      </Popover>
      <Popover
        triggerContent={<Button variant="outline">Align center</Button>}
        align="center"
      >
        <div className="p-2">
          <p className="text-sm">Popover aligned to center (default)</p>
        </div>
      </Popover>
      <Popover
        triggerContent={<Button variant="outline">Align end</Button>}
        align="end"
      >
        <div className="p-2">
          <p className="text-sm">Popover aligned to end</p>
        </div>
      </Popover>
    </div>
  ),
} as unknown as Story;

export const Side: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 h-64">
      <div className="flex justify-center items-end">
        <Popover
          triggerContent={<Button variant="outline">Side top</Button>}
          side="top"
        >
          <div className="p-2">
            <p className="text-sm">Popover appears on top</p>
          </div>
        </Popover>
      </div>
      <div className="flex justify-center items-start">
        <Popover
          triggerContent={<Button variant="outline">Side bottom</Button>}
          side="bottom"
        >
          <div className="p-2">
            <p className="text-sm">Popover appears on bottom (default)</p>
          </div>
        </Popover>
      </div>
      <div className="flex justify-start items-center">
        <Popover
          triggerContent={<Button variant="outline">Side right</Button>}
          side="right"
        >
          <div className="p-2">
            <p className="text-sm">Popover appears on right</p>
          </div>
        </Popover>
      </div>
      <div className="flex justify-end items-center">
        <Popover
          triggerContent={<Button variant="outline">Side left</Button>}
          side="left"
        >
          <div className="p-2">
            <p className="text-sm">Popover appears on left</p>
          </div>
        </Popover>
      </div>
    </div>
  ),
} as unknown as Story;

export const SideOffset: Story = {
  render: () => (
    <div className="space-y-4">
      <Popover
        triggerContent={<Button variant="outline">Default offset (4px)</Button>}
        sideOffset={4}
      >
        <div className="p-2">
          <p className="text-sm">Default sideOffset: 4px</p>
        </div>
      </Popover>
      <Popover
        triggerContent={<Button variant="outline">Large offset (20px)</Button>}
        sideOffset={20}
      >
        <div className="p-2">
          <p className="text-sm">Large sideOffset: 20px</p>
        </div>
      </Popover>
    </div>
  ),
} as unknown as Story;

export const AlignOffset: Story = {
  render: () => (
    <div className="flex justify-center space-x-4">
      <Popover
        triggerContent={<Button variant="outline">No offset</Button>}
        alignOffset={0}
      >
        <div className="p-2">
          <p className="text-sm">alignOffset: 0</p>
        </div>
      </Popover>
      <Popover
        triggerContent={<Button variant="outline">With offset</Button>}
        alignOffset={20}
      >
        <div className="p-2">
          <p className="text-sm">alignOffset: 20px</p>
        </div>
      </Popover>
    </div>
  ),
} as unknown as Story;

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <Popover
          open={open}
          onOpenChange={setOpen}
          triggerContent={<Button variant="outline">Controlled popover</Button>}
        >
          <div className="p-4 space-y-2">
            <p className="text-sm">This popover is controlled by state</p>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </Popover>
        <p className="text-sm text-muted-foreground">
          Open state: {open ? "open" : "closed"}
        </p>
      </div>
    );
  },
} as unknown as Story;

export const Uncontrolled: Story = {
  render: () => (
    <Popover
      defaultOpen={true}
      triggerContent={
        <Button variant="outline">Uncontrolled (defaultOpen)</Button>
      }
    >
      <div className="p-2">
        <p className="text-sm">This popover starts open by default</p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const Modal: Story = {
  render: () => (
    <Popover
      modal={true}
      triggerContent={<Button variant="outline">Modal popover</Button>}
    >
      <div className="p-4 space-y-2">
        <p className="text-sm">
          Modal popover blocks interaction with the rest of the page
        </p>
        <p className="text-xs text-muted-foreground">Click outside to close</p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const CustomClassName: Story = {
  render: () => (
    <Popover
      triggerContent={<Button variant="outline">Custom styling</Button>}
      className="w-96 bg-muted border-2"
    >
      <div className="p-4">
        <p className="text-sm">Popover with custom className</p>
        <p className="text-xs text-muted-foreground mt-2">
          Custom background and border colors
        </p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const CustomStyle: Story = {
  render: () => (
    <Popover
      triggerContent={<Button variant="outline">Custom style</Button>}
      style={{
        width: "400px",
        backgroundColor: "#fef3c7",
        borderColor: "#f59e0b",
      }}
    >
      <div className="p-4">
        <p className="text-sm">Popover with custom inline styles</p>
        <p className="text-xs text-muted-foreground mt-2">
          Using the style prop
        </p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const AvoidCollisions: Story = {
  render: () => (
    <div className="flex justify-end">
      <Popover
        triggerContent={<Button variant="outline">Avoid collisions</Button>}
        avoidCollisions={true}
        side="right"
      >
        <div className="p-2">
          <p className="text-sm">
            This popover will flip sides if there&apos;s not enough space
          </p>
        </div>
      </Popover>
    </div>
  ),
} as unknown as Story;

export const Sticky: Story = {
  render: () => (
    <Popover
      triggerContent={<Button variant="outline">Sticky alignment</Button>}
      sticky="always"
      align="start"
    >
      <div className="p-2">
        <p className="text-sm">
          Sticky alignment keeps the popover aligned even when scrolling
        </p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const HideWhenDetached: Story = {
  render: () => (
    <Popover
      triggerContent={<Button variant="outline">Hide when detached</Button>}
      hideWhenDetached={true}
    >
      <div className="p-2">
        <p className="text-sm">
          This popover will hide if it becomes detached from the trigger
        </p>
      </div>
    </Popover>
  ),
} as unknown as Story;

export const CollisionBoundary: Story = {
  render: () => (
    <div
      className="relative border-2 border-dashed p-8"
      style={{ height: "200px", overflow: "auto" }}
    >
      <div className="absolute top-4 right-4">
        <Popover
          triggerContent={
            <Button variant="outline">With collision boundary</Button>
          }
          collisionBoundary={
            document.querySelector(".border-dashed") as Element
          }
          side="right"
        >
          <div className="p-2">
            <p className="text-sm">
              This popover respects the collision boundary (dashed border)
            </p>
          </div>
        </Popover>
      </div>
      <p className="text-xs text-muted-foreground mt-16">
        Scroll to see collision detection in action
      </p>
    </div>
  ),
} as unknown as Story;

export const CollisionPadding: Story = {
  render: () => (
    <div className="space-y-4">
      <Popover
        triggerContent={<Button variant="outline">No padding</Button>}
        collisionPadding={0}
        side="right"
      >
        <div className="p-2">
          <p className="text-sm">collisionPadding: 0</p>
        </div>
      </Popover>
      <Popover
        triggerContent={<Button variant="outline">With padding</Button>}
        collisionPadding={20}
        side="right"
      >
        <div className="p-2">
          <p className="text-sm">collisionPadding: 20px</p>
        </div>
      </Popover>
    </div>
  ),
} as unknown as Story;
