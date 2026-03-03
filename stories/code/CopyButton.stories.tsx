import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CopyButton } from "@/design-system/copy-button";
import { Container } from "@/components/layouts/container";
import { SandpackCodeBlockWrapper } from "@/design-system/sandpack-code-block";

const meta = {
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    variant: {
      control: "select",
      options: ["ghost", "outline", "secondary"],
    },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Hello, world!",
    size: "default",
    variant: "ghost",
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <SandpackCodeBlockWrapper>
          <Story />
        </SandpackCodeBlockWrapper>
      </Container>
    ),
  ],
};
