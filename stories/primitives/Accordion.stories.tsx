import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/design-system/accordion";
import { Container } from "@/components/layouts/container";

const meta = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">Is it accessible?</span>
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">Is it styled?</span>
        </AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">Is it animated?</span>
        </AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">Can I open multiple items?</span>
        </AccordionTrigger>
        <AccordionContent>
          Yes! This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">Is it customizable?</span>
        </AccordionTrigger>
        <AccordionContent>
          Absolutely! You can customize the styling, animations, and behavior to
          match your needs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">
            What about keyboard navigation?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Full keyboard support is included with proper ARIA attributes and
          focus management.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-full">
          <span className="flex-1 text-left">Long content example</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              This accordion item contains a lot of content to demonstrate how
              it handles longer text.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>First bullet point</li>
              <li>Second bullet point</li>
              <li>Third bullet point</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
