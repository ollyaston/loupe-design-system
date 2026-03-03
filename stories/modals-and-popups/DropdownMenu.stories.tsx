import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  DropdownMenuWrapper,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownButtonTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/design-system/dropdown-menu";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";
import { Icon } from "@/design-system/icon";

const meta = {
  component: DropdownMenuWrapper,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof DropdownMenuWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenuWrapper>
      <DropdownButtonTrigger variant="outline" showArrow>
        Open menu
      </DropdownButtonTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="person" size={16} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="credit_card" size={16} />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="settings" size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="logout" size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuWrapper>
  ),
};

export const RawTrigger: Story = {
  render: () => (
    <DropdownMenuWrapper>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="person" size={16} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="credit_card" size={16} />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="settings" size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="logout" size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuWrapper>
  ),
};

export const WithCheckboxes: Story = {
  render: () => (
    <DropdownMenuWrapper>
      <DropdownButtonTrigger variant="secondary" size="sm" showArrow>
        View options
      </DropdownButtonTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>View options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Show labels</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show icons</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show timestamps</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenuWrapper>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <DropdownMenuWrapper>
      <DropdownButtonTrigger variant="ghost" size="lg" showArrow>
        Theme
      </DropdownButtonTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="light">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenuWrapper>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <DropdownMenuWrapper>
      <DropdownButtonTrigger variant="destructive" showArrow>
        More actions
      </DropdownButtonTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Copy</DropdownMenuItem>
        <DropdownMenuItem>Cut</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Import</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenuWrapper>
  ),
};
