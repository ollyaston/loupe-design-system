import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChatLayout } from "../../components/layouts/chat-layout";
import { DemoBanner } from "../../design-system/demo-banner";

const meta: Meta<typeof ChatLayout> = {
  component: ChatLayout,
  parameters: {
    docs: {
      description: {
        component: "A layout component for chat pages without logos.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

export const Default: Story = {
  render: () => {
    return (
      <div className="h-64 w-full">
        <ChatLayout sidebarContent={<p>Hello world</p>}>
          <p>Hello world</p>
        </ChatLayout>
      </div>
    );
  },
};

export const WithDemoBanner: Story = {
  render: () => {
    return (
      <div className="h-64 w-full">
        <ChatLayout
          sidebarContent={<p>Hello world</p>}
          demoBanner={<DemoBanner />}
        >
          <p>Hello world</p>
        </ChatLayout>
      </div>
    );
  },
};
