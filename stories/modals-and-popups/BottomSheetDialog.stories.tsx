import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BottomSheetDialog } from "@/design-system/bottom-sheet-dialog";
import { Button } from "@/design-system/button";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";
import { useState } from "react";

const meta: Meta<typeof BottomSheetDialog> = {
  component: BottomSheetDialog,
  parameters: {
    docs: {
      description: {
        component:
          "A full-screen bottom-anchored dialog that slides up from the bottom of the viewport. Useful for complex forms with previews or multi-step workflows.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BottomSheetDialog>;

const BottomSheetDemo = ({
  title,
  topOffset,
}: {
  title: string;
  topOffset?: number;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <BottomSheetDialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      topOffset={topOffset}
    >
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="Enter name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter email" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="Enter description" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 px-6 py-4 border-t">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)}>Save</Button>
      </div>
    </BottomSheetDialog>
  );
};

export const Default: Story = {
  render: () => <BottomSheetDemo title="Edit item" />,
};

export const CustomTopOffset: Story = {
  render: () => <BottomSheetDemo title="Stacked dialog" topOffset={120} />,
  parameters: {
    docs: {
      description: {
        story:
          "Use a larger topOffset to create a stacking effect when opening a dialog on top of another dialog.",
      },
    },
  },
};

const NoCloseButtonDemo = () => {
  const [open, setOpen] = useState(true);

  return (
    <BottomSheetDialog
      open={open}
      onOpenChange={setOpen}
      title="Required action"
      showCloseButton={false}
    >
      <div className="flex-1 overflow-auto px-6 py-4">
        <p className="text-sm text-muted-foreground">
          This dialog has no close button in the header. Users must use the
          action buttons to close it.
        </p>
      </div>
      <div className="flex justify-end gap-3 px-6 py-4 border-t">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)}>Confirm</Button>
      </div>
    </BottomSheetDialog>
  );
};

export const NoCloseButton: Story = {
  render: () => <NoCloseButtonDemo />,
};
