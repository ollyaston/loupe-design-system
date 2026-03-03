import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from "@/design-system/icon";
import { HoverCard } from "@/design-system/hover-card";
import { Button } from "@/design-system/button";
import { Avatar } from "@/design-system/avatar";
import { Container } from "@/components/layouts/container";

const meta = {
  component: HoverCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-8 min-h-64 flex justify-center">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="link">@loupe</Button>,
    content: (
      <div className="flex justify-between space-x-4">
        <Avatar
          src="https://avatars.githubusercontent.com/u/194257580?s=200&v=4"
          alt="Loupe"
        />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@loupe</h4>
          <p className="text-sm">
            The AI-powered platform for modern applications.
          </p>
          <div className="flex items-center pt-2">
            <Icon name="calendar_today" size={16} className="mr-2 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Joined January 2025
            </span>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithUserProfile: Story = {
  args: {
    trigger: <Button variant="outline">View profile</Button>,
    content: (
      <div className="flex justify-between space-x-4">
        <Avatar
          src="https://avatars.githubusercontent.com/u/194257580?s=200&v=4"
          alt="Loupe"
        />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@loupe</h4>
          <p className="text-sm">
            Building beautiful and accessible AI-powered applications.
          </p>
          <div className="flex items-center pt-2">
            <Icon name="location_on" size={16} className="mr-2 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">London, UK</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithContactInfo: Story = {
  args: {
    trigger: (
      <Button variant="ghost" size="icon">
        <Icon name="circle" size={16} />
      </Button>
    ),
    content: (
      <div className="flex justify-between space-x-4">
        <Avatar
          src="https://avatars.githubusercontent.com/u/194257580?s=200&v=4"
          alt="John Doe"
        />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">John Doe</h4>
          <p className="text-sm">
            Software Engineer at Loupe. Passionate about AI and modern
            applications.
          </p>
          <div className="flex items-center pt-2 space-x-4">
            <div className="flex items-center">
              <Icon name="mail" size={16} className="mr-2 opacity-70" />
              <span className="text-xs text-muted-foreground">
                john@loupe.com
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const SimpleText: Story = {
  args: {
    trigger: <Button variant="link">Hover for more info</Button>,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Additional information</h4>
        <p className="text-sm text-muted-foreground">
          This is a simple hover card with just text content. It can be used to
          provide additional context or information about an element.
        </p>
      </div>
    ),
  },
};

export const WithList: Story = {
  args: {
    trigger: <Button variant="outline">View stats</Button>,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Project statistics</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Commits</span>
            <span className="font-medium">1,234</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Issues</span>
            <span className="font-medium">56</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Pull requests</span>
            <span className="font-medium">23</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Stars</span>
            <span className="font-medium">8,901</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const LeftAligned: Story = {
  args: {
    trigger: <Button variant="outline">Left aligned</Button>,
    align: "start",
    content: (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Left aligned</h4>
        <p className="text-sm text-muted-foreground">
          This hover card is aligned to the left side of the trigger.
        </p>
      </div>
    ),
  },
};

export const RightAligned: Story = {
  args: {
    trigger: <Button variant="outline">Right aligned</Button>,
    align: "end",
    content: (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Right aligned</h4>
        <p className="text-sm text-muted-foreground">
          This hover card is aligned to the right side of the trigger.
        </p>
      </div>
    ),
  },
};
