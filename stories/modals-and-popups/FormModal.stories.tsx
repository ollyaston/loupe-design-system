import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormModal } from "@/design-system/form-modal";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";
import { useState } from "react";

const meta: Meta<typeof FormModal> = {
  /* eslint-disable-next-line agent-loupe-ui/sentence-case -- Storybook section title uses category/component convention */
  title: "Modals and Popups/FormModal",
  component: FormModal,
  parameters: {
    docs: {
      description: {
        component:
          "A reusable modal component for forms with a consistent layout including header, scrollable content area, and footer with cancel/submit buttons.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormModal>;

const FormModalDemo = ({
  title,
  isSubmitting,
  submitLabel,
  submittingLabel,
  cancelLabel,
}: {
  title: string;
  isSubmitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  cancelLabel?: string;
}) => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");

  return (
    <FormModal
      open={open}
      onOpenChange={setOpen}
      title={title}
      onSubmit={() => console.log("Submitted:", { name })}
      onCancel={() => console.log("Cancelled")}
      isSubmitting={isSubmitting}
      submitLabel={submitLabel}
      submittingLabel={submittingLabel}
      cancelLabel={cancelLabel}
    >
      <div className="space-y-1.5">
        <Label>Name</Label>
        <Input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" placeholder="Enter email" />
      </div>
    </FormModal>
  );
};

export const Default: Story = {
  render: () => <FormModalDemo title="New item" />,
};

export const Submitting: Story = {
  render: () => <FormModalDemo title="Creating item" isSubmitting={true} />,
};

export const CustomLabels: Story = {
  render: () => (
    <FormModalDemo
      title="Edit customer"
      submitLabel="Update"
      submittingLabel="Updating..."
      cancelLabel="Discard"
    />
  ),
};

const MultiFieldFormDemo = () => {
  const [open, setOpen] = useState(true);

  return (
    <FormModal
      open={open}
      onOpenChange={setOpen}
      title="Create customer"
      onSubmit={() => console.log("Submitted")}
    >
      <div className="space-y-1.5">
        <Label>Company name</Label>
        {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
        <Input placeholder="Acme Inc" />
      </div>
      <div className="space-y-1.5">
        <Label>External ID</Label>
        <Input placeholder="acme-inc" />
      </div>
      <div className="space-y-1.5">
        <Label>Website</Label>
        <Input placeholder="https://acme.com" />
      </div>
      <div className="space-y-1.5">
        <Label>Phone</Label>
        <Input placeholder="+1 (555) 123-4567" />
      </div>
      <div className="space-y-1.5">
        <Label>Address line 1</Label>
        <Input placeholder="123 Main St" />
      </div>
      <div className="space-y-1.5">
        <Label>Address line 2</Label>
        <Input placeholder="Suite 100" />
      </div>
      <div className="space-y-1.5">
        <Label>City</Label>
        <Input placeholder="San Francisco" />
      </div>
      <div className="space-y-1.5">
        <Label>State</Label>
        <Input placeholder="CA" />
      </div>
    </FormModal>
  );
};

export const WithManyFields: Story = {
  render: () => <MultiFieldFormDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "FormModal with many fields demonstrates the scrollable content area when content exceeds the max height.",
      },
    },
  },
};
