import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "../../design-system/badge";
import { Container } from "@/components/layouts/container";
import { Icon } from "../../design-system/icon";

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const InMainContent: Story = {
  args: {
    variant: "default",
    children: "Badge",
  },
  render: () => (
    <Container>
      <div className="p-4 flex flex-wrap gap-2">
        <Badge variant="default">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="secondary" contentType="numbers">
          1
        </Badge>
        <Badge variant="secondary" contentType="numbers">
          11
        </Badge>
        <Badge variant="secondary" contentType="numbers">
          1234567890
        </Badge>
      </div>
    </Container>
  ),
};

export const InSidebar: Story = {
  args: {
    variant: "sidebar",
    children: "Badge",
  },
  render: () => (
    <div className="bg-sidebar p-4 flex flex-wrap gap-2 rounded-lg">
      <Badge variant="sidebar">Sidebar</Badge>
      <Badge variant="sidebar" contentType="numbers">
        1
      </Badge>
      <Badge variant="sidebar" contentType="numbers">
        11
      </Badge>
      <Badge variant="sidebar" contentType="numbers">
        1234567890
      </Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    variant: "default",
    children: "Badge",
  },
  render: () => (
    <Container>
      <div className="p-4 flex flex-wrap gap-2">
        <Badge variant="default" className="flex items-center gap-1">
          <Icon name="home" size={12} />
          Home
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Icon name="settings" size={12} />
          Settings
        </Badge>
        <Badge variant="destructive" className="flex items-center gap-1">
          <Icon name="feedback" size={12} />
          Error
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Icon name="explore" size={12} />
          Explore
        </Badge>
        <Badge variant="default" className="flex items-center gap-1">
          Success
          <Icon name="arrow_up_right" size={12} />
        </Badge>
        <Badge
          variant="secondary"
          contentType="numbers"
          className="flex items-center gap-1"
        >
          <Icon name="graphic_eq" size={12} />
          99%
        </Badge>
      </div>
    </Container>
  ),
};

export const WithNumberFormatting: Story = {
  args: {
    variant: "default",
    children: "Badge",
  },
  render: () => (
    <Container>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">
            Without Number Formatting (Default)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">1,234</Badge>
            <Badge variant="secondary">12,345</Badge>
            <Badge variant="destructive">123,456</Badge>
            <Badge variant="outline">1,234,567</Badge>
            <Badge variant="secondary" contentType="numbers">
              12,345,678
            </Badge>
            <Badge variant="default" contentType="numbers">
              123,456,789
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            With Number Formatting (Hover for full number)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" formatNumbers>
              1,234
            </Badge>
            <Badge variant="secondary" formatNumbers>
              12,345
            </Badge>
            <Badge variant="destructive" formatNumbers>
              123,456
            </Badge>
            <Badge variant="outline" formatNumbers>
              1,234,567
            </Badge>
            <Badge variant="secondary" contentType="numbers" formatNumbers>
              12,345,678
            </Badge>
            <Badge variant="default" contentType="numbers" formatNumbers>
              123,456,789
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            Currency Values (Hover for full number)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" formatNumbers>
              $1,234
            </Badge>
            <Badge variant="secondary" formatNumbers>
              $12,345
            </Badge>
            <Badge variant="destructive" formatNumbers>
              $123,456
            </Badge>
            <Badge variant="outline" formatNumbers>
              $1,234,567
            </Badge>
            <Badge variant="secondary" contentType="numbers" formatNumbers>
              $12,345,678
            </Badge>
            <Badge variant="default" contentType="numbers" formatNumbers>
              $123,456,789
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            Non-Numeric Content (Unchanged, no tooltip)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" formatNumbers>
              Active
            </Badge>
            <Badge variant="secondary" formatNumbers>
              Pending
            </Badge>
            <Badge variant="destructive" formatNumbers>
              Error
            </Badge>
            <Badge variant="outline" formatNumbers>
              N/A
            </Badge>
            <Badge variant="secondary" formatNumbers>
              --
            </Badge>
          </div>
        </div>
      </div>
    </Container>
  ),
};
