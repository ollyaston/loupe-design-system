import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "@/design-system/separator";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Separator,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    text: {
      control: { type: "text" },
      description: "Text to display in the middle of the separator",
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "my-4",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-6",
  },
};

export const WithText: Story = {
  args: {
    text: "or",
  },
};

export const WithCustomText: Story = {
  args: {
    text: "continue with",
  },
};

export const WithContent: Story = {
  render: () => (
    <div className="space-y-4 min-w-[200px]">
      <div>
        <h4 className="text-sm font-medium leading-none">Radix primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator />
      <div className="flex h-4 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2 min-w-[200px]">
      <div className="text-sm font-medium">Recent searches</div>
      <Separator />
      <div className="text-sm">react components</div>
      <Separator />
      <div className="text-sm">tailwind css</div>
      <Separator />
      <div className="text-sm">typescript</div>
      <Separator />
      <div className="text-sm">next.js</div>
    </div>
  ),
};

export const SignInExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4 min-w-[200px]">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Sign In
        </button>
      </div>
      <Separator text="or" />
      <div className="space-y-2">
        <button className="w-full px-4 py-2 border rounded-md flex items-center justify-center gap-2">
          <span>Continue with Google</span>
        </button>
        <button className="w-full px-4 py-2 border rounded-md flex items-center justify-center gap-2">
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  ),
};
