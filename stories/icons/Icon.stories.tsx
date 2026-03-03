import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AP_ICONS, Icon } from "../../design-system/icon";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Icon> = {
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
          Icons come from one of two sources:
          - Material Icons - These are the icons that come with the Material UI library.
          - Custom Icons - These are the icons that come with the Loupe design system.
        `,
      },
    },
  },
  tags: ["autodocs"],
  // TODO - move to single layout wrapper?
  decorators: [
    (Story) => (
      <Container className="p-4">
        <div className="flex flex-wrap gap-2">
          <Story />
        </div>
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const MaterialIcons: Story = {
  args: {
    size: 24,
  },
  render: () => (
    <>
      <Icon name="account_circle" size={24} />
      <Icon name="attach_money" size={24} />
      <Icon name="circle" size={24} />
      <Icon name="code_blocks" size={24} />
      <Icon name="credit_card" size={24} />
      <Icon name="edit" size={24} />
      <Icon name="explore" size={24} />
      <Icon name="favorite" size={24} />
      <Icon name="graphic_eq" size={24} />
      <Icon name="language" size={24} />
      <Icon name="local_atm" size={24} />
      <Icon name="margin" size={24} />
      <Icon name="person_book" size={24} />
      <Icon name="robot_2" size={24} />
      <Icon name="send_money" size={24} />
      <Icon name="shopping_bag" size={24} />
      <Icon name="swap_calls" size={24} />
    </>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <>
      {AP_ICONS.map((icon) => (
        <Icon key={icon} name={icon} size={24} />
      ))}
    </>
  ),
};
