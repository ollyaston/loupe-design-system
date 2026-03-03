import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FormActions } from "@/design-system/form-actions";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";

const meta = {
  component: FormActions,
  parameters: {
    docs: {
      description: {
        component:
          "A component for organizing form action buttons with configurable alignment.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["left", "right", "fill"],
    },
  },
} satisfies Meta<typeof FormActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    align: "right",
    children: (
      <>
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </>
    ),
  },
};

export const LeftAligned: Story = {
  args: {
    align: "left",
    children: (
      <>
        <Button>Submit</Button>
      </>
    ),
  },
};

export const RightAligned: Story = {
  args: {
    align: "right",
    children: (
      <>
        <Button>Submit</Button>
      </>
    ),
  },
};

export const FillAligned: Story = {
  args: {
    align: "fill",
    children: (
      <>
        <Button className="w-full">Submit</Button>
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
      </>
    ),
  },
};

export const LeftAlignedTwoActions: Story = {
  args: {
    align: "left",
    children: (
      <>
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </>
    ),
  },
};

export const RightAlignedTwoActions: Story = {
  args: {
    align: "right",
    children: (
      <>
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </>
    ),
  },
};

export const FillAlignedTwoActions: Story = {
  args: {
    align: "fill",
    children: (
      <>
        <Button className="w-full">Submit</Button>
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
      </>
    ),
  },
};

export const LeftAlignedThreeActions: Story = {
  args: {
    align: "left",
    children: (
      <>
        <Button>Publish</Button>
        <Button variant="outline">Save draft</Button>
        <Button variant="ghost">Reset</Button>
      </>
    ),
  },
};

export const RightAlignedThreeActions: Story = {
  args: {
    align: "right",
    children: (
      <>
        <Button>Publish</Button>
        <Button variant="outline">Save draft</Button>
        <Button variant="ghost">Reset</Button>
      </>
    ),
  },
};

export const InFormContext: Story = {
  args: {
    align: "right",
    children: (
      <>
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </>
    ),
  },
  render: (args) => (
    <div className="max-w-md space-y-6 p-6 border rounded-lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <FormActions {...args} />
    </div>
  ),
};
