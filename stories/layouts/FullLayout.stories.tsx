import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FullLayout } from "../../components/layouts/full-layout";

const meta: Meta<typeof FullLayout> = {
  component: FullLayout,
  parameters: {
    docs: {
      description: {
        component:
          "A full-screen layout component with white background area and no sidebar. For navigation examples, see the CreateWizardNav component stories.",
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
type Story = StoryObj<typeof FullLayout>;

export const Default: Story = {
  render: () => {
    return <FullLayout>Content goes here</FullLayout>;
  },
};

export const WithTopNav: Story = {
  render: () => {
    return (
      <FullLayout
        topNav={{
          leftText: "Back",
          onLeftClick: () => console.log("Back clicked"),
          rightText: "Next",
          onRightClick: () => console.log("Next clicked"),
        }}
      >
        Content goes here
      </FullLayout>
    );
  },
};
