import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Gem, gemTypes } from "../../design-system/gem";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Gem> = {
  component: Gem,
  parameters: {
    docs: {
      description: {
        component:
          "Gems are an opinionated IconBadge wrapper with strict icon/color pairings that represent specific models in our app.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Gem>;

export const GemTypes: Story = {
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap gap-2 my-4">
      {gemTypes.map((gemType) => (
        <Gem key={gemType.id} id={gemType.id} size={48} />
      ))}
    </div>
  ),
};

export const GemSizes: Story = {
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap gap-2 my-4">
      <Gem id="orders" size={12} />
      <Gem id="orders" size={16} />
      <Gem id="orders" size={20} />
      <Gem id="orders" size={24} />
      <Gem id="orders" size={28} />
      <Gem id="orders" size={32} />
      <Gem id="orders" size={36} />
      <Gem id="orders" size={40} />
      <Gem id="orders" size={48} />
      <Gem id="orders" size={56} />
      <Gem id="orders" size={64} />
      <Gem id="orders" size={72} />
      <Gem id="orders" size={80} />
      <Gem id="orders" size={96} />
    </div>
  ),
};

export const GemDarkMode: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 my-4">
      {gemTypes.map((gemType) => (
        <Gem key={gemType.id} id={gemType.id} size={48} darkMode />
      ))}
    </div>
  ),
};

export const GemWithBackground: Story = {
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap gap-2 my-4">
      {gemTypes.map((gemType) => (
        <Gem key={gemType.id} id={gemType.id} size={48} background={true} />
      ))}
    </div>
  ),
};

export const GemWithBackgroundDarkMode: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 my-4">
      {gemTypes.map((gemType) => (
        <Gem
          key={gemType.id}
          id={gemType.id}
          size={48}
          background={true}
          darkMode={true}
        />
      ))}
    </div>
  ),
};
