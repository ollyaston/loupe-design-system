import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/design-system/collapsible";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";
import { Icon } from "@/design-system/icon";

const meta = {
  component: Collapsible,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Click to expand</span>
            <Icon name="keyboard_arrow_down" size={16} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content goes here</CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Dependencies</span>
            <Icon name="keyboard_arrow_down" size={16} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content goes here</CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Show details</span>
            <Icon name="keyboard_arrow_down" size={16} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
          <p> Content goes here</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
