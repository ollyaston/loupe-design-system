import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { ScrollArea, ScrollBar } from "@/design-system/scroll-area";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-72 w-48 rounded-md border",
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm">
            v1.2.0-beta.{i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    className: "w-96 whitespace-nowrap rounded-md border",
    children: (
      <>
        <div className="flex w-max space-x-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="shrink-0">
              <div className="aspect-square h-16 w-16 rounded-md bg-muted" />
              <p className="mt-2 text-sm">Item {i + 1}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </>
    ),
  },
};

export const BothOrientations: Story = {
  args: {
    className: "h-72 w-96 rounded-md border",
    children: (
      <>
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">
            Both scrollbars
          </h4>
          <div className="w-[600px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="mb-2 text-sm">
                This is a long line of text that will demonstrate both
                horizontal and vertical scrolling. Line {i + 1} with some
                additional content to make it longer.
              </div>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </>
    ),
  },
};

export const CustomHeight: Story = {
  args: {
    className: "h-48 w-48 rounded-md border",
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Custom height</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    className: "h-64 w-64 rounded-md border",
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Content example
        </h4>
        <div className="space-y-2">
          <div className="rounded-md bg-muted p-3">
            <h5 className="font-medium">Card 1</h5>
            <p className="text-sm text-muted-foreground">
              This is some content in a card.
            </p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <h5 className="font-medium">Card 2</h5>
            <p className="text-sm text-muted-foreground">
              Another card with different content.
            </p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <h5 className="font-medium">Card 3</h5>
            <p className="text-sm text-muted-foreground">
              Yet another card for demonstration.
            </p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <h5 className="font-medium">Card 4</h5>
            <p className="text-sm text-muted-foreground">
              More content to show scrolling.
            </p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <h5 className="font-medium">Card 5</h5>
            <p className="text-sm text-muted-foreground">
              Final card in the list.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const NoScrollbar: Story = {
  args: {
    className: "h-48 w-48 rounded-md border",
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">No scrollbar</h4>
        <div className="text-sm">
          This content fits within the container, so no scrollbar is needed.
        </div>
      </div>
    ),
  },
};
