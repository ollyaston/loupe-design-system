import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OnePagerLayout } from "@/design-system/one-pager-layout";
import { Heading } from "@/design-system/heading";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";
import { Button } from "@/design-system/button";

const meta: Meta<typeof OnePagerLayout> = {
  title: "Layouts/OnePagerLayout",
  component: OnePagerLayout,
  parameters: {
    docs: {
      description: {
        component:
          "A centered single-page layout with a card container. Automatically adds separators between child sections. Ideal for settings pages, forms, and configuration screens.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OnePagerLayout>;

export const Default: Story = {
  render: () => {
    return (
      <OnePagerLayout>
        <div>
          <Heading
            size="section"
            title="Section one"
            description="This is the first section"
          />
          <p className="mt-4 text-muted-foreground">
            Content for the first section goes here.
          </p>
        </div>

        <div>
          <Heading
            size="section"
            title="Section two"
            description="This is the second section"
          />
          <p className="mt-4 text-muted-foreground">
            Content for the second section goes here.
          </p>
        </div>

        <div>
          <Heading
            size="section"
            title="Section three"
            description="This is the third section"
          />
          <p className="mt-4 text-muted-foreground">
            Content for the third section goes here.
          </p>
        </div>
      </OnePagerLayout>
    );
  },
};

export const SettingsPage: Story = {
  render: () => {
    return (
      <OnePagerLayout>
        <div>
          <Heading
            size="section"
            title="Company information"
            description="Your company's basic details"
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <Label>Company name</Label>
              {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
              <Input placeholder="Acme Inc." className="mt-1.5" />
            </div>
            <div>
              <Label>Website</Label>
              <Input placeholder="https://example.com" className="mt-1.5" />
            </div>
          </div>
        </div>

        <div>
          <Heading
            size="section"
            title="Business address"
            description="Your company's primary business address"
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="col-span-2">
              <Label>Street address</Label>
              <Input placeholder="123 Main St" className="mt-1.5" />
            </div>
            <div>
              <Label>City</Label>
              <Input placeholder="San Francisco" className="mt-1.5" />
            </div>
            <div>
              <Label>Country</Label>
              <Input placeholder="United States" className="mt-1.5" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg mb-1">Save changes</h2>
            <p className="text-muted-foreground text-sm">
              Save your company information
            </p>
          </div>
          <Button>Save</Button>
        </div>
      </OnePagerLayout>
    );
  },
};

export const SingleSection: Story = {
  render: () => {
    return (
      <OnePagerLayout>
        <div>
          <Heading
            size="section"
            title="Single section"
            description="A layout with just one section has no separators"
          />
          <p className="mt-4 text-muted-foreground">
            This is useful for simple forms or focused content.
          </p>
        </div>
      </OnePagerLayout>
    );
  },
};
