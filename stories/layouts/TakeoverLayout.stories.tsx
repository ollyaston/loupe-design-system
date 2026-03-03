import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TakeoverLayout } from "../../components/layouts/takeover-layout";
import { Spinner } from "../../design-system/spinner";

const meta: Meta<typeof TakeoverLayout> = {
  component: TakeoverLayout,
  parameters: {
    docs: {
      description: {
        component: "A layout component for takeover pages.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TakeoverLayout>;

export const Default: Story = {
  render: () => {
    return (
      <TakeoverLayout>
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner size={16} />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </TakeoverLayout>
    );
  },
};
