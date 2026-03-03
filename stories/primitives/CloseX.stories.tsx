import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CloseX } from "@/design-system/close-x";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof CloseX> = {
  component: CloseX,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <div className="flex flex-wrap gap-2">
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["ghost", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log("Close clicked"),
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <CloseX size="sm" onClick={() => console.log("Small close clicked")} />
      <CloseX
        size="default"
        onClick={() => console.log("Default close clicked")}
      />
      <CloseX size="lg" onClick={() => console.log("Large close clicked")} />
    </>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <>
      <CloseX
        variant="ghost"
        onClick={() => console.log("Ghost close clicked")}
      />
      <CloseX
        variant="outline"
        onClick={() => console.log("Outline close clicked")}
      />
    </>
  ),
};
