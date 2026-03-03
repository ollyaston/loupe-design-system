import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InfoHover } from "@/design-system/info-hover";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof InfoHover> = {
  component: InfoHover,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-8">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    content: {
      control: "text",
      description: "The content to display in the tooltip",
    },
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The side where the tooltip should appear",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content:
      "This is a helpful tooltip that appears when you hover over the info icon.",
  },
};

export const WithLongContent: Story = {
  args: {
    content:
      "Upload your company logo (JPG or PNG, at least 128x128px, max 512KB). This will be used for your organization's invoice branding.",
  },
};

export const WithReactContent: Story = {
  args: {
    content: (
      <div>
        <p className="font-medium mb-1">Important information</p>
        <p>This tooltip can contain rich content including:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Multiple lines</li>
          <li>Styled text</li>
          <li>Lists and other elements</li>
        </ul>
      </div>
    ),
  },
};

export const DifferentSides: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex gap-8 items-center">
        <InfoHover content="Tooltip on top" side="top" />
        <InfoHover content="Tooltip on bottom" side="bottom" />
      </div>
      <div className="flex gap-8 items-center">
        <InfoHover content="Tooltip on left" side="left" />
        <InfoHover content="Tooltip on right" side="right" />
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Company logo</label>
        <InfoHover content="Upload your company logo (JPG or PNG, at least 128x128px, max 512KB). This will be used for your organization's invoice branding." />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">API Key</label>
        <InfoHover content="Your API key is used to authenticate requests to our services. Keep it secure and never share it publicly." />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Billing period</label>
        <InfoHover content="This setting determines how often you'll be billed for your usage." />
      </div>
    </div>
  ),
};
