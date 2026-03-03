import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AccountLayout } from "../../components/layouts/account-layout";
import { DemoBanner } from "../../design-system/demo-banner";

const meta: Meta<typeof AccountLayout> = {
  component: AccountLayout,
  parameters: {
    docs: {
      description: {
        component: "A layout component for account pages.",
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
type Story = StoryObj<typeof AccountLayout>;

export const Default: Story = {
  render: () => {
    return (
      <AccountLayout>
        <div className="space-y-8">
          <h1>Default layout</h1>
          <p>Shows features list in sidebar by default</p>
        </div>
      </AccountLayout>
    );
  },
};

export const WithCustomSidebarContent: Story = {
  render: () => {
    return (
      <AccountLayout
        sidebarContent={
          <div className="text-center">Custom sidebar content</div>
        }
      >
        <div className="space-y-8">
          <h1>Custom sidebar</h1>
          <p>Uses custom sidebar content instead of default features</p>
        </div>
      </AccountLayout>
    );
  },
};

export const WithLogoSidebar: Story = {
  render: () => {
    return (
      <AccountLayout sidebarType="logo">
        <div className="space-y-8">
          <h1>Logo sidebar</h1>
          <p>Shows the Loupe logotype in the sidebar instead of features</p>
        </div>
      </AccountLayout>
    );
  },
};

export const WithFeaturesSidebar: Story = {
  render: () => {
    return (
      <AccountLayout sidebarType="features">
        <div className="space-y-8">
          <h1>Features sidebar</h1>
          <p>Explicitly shows the features list in the sidebar</p>
        </div>
      </AccountLayout>
    );
  },
};

export const WithDemoBanner: Story = {
  render: () => {
    return (
      <AccountLayout demoBanner={<DemoBanner />}>
        <div className="space-y-8">
          <h1>With demo banner</h1>
          <p>Shows a demo banner at the top of the layout</p>
        </div>
      </AccountLayout>
    );
  },
};
