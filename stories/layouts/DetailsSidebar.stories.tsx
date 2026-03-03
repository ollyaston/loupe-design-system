import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DetailsSidebar from "@/design-system/details-sidebar";
import { Container } from "@/components/layouts/container";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";

const meta = {
  title: "Layouts/DetailsSidebar",
  component: DetailsSidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4 max-w-md">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof DetailsSidebar>;

export default meta;
type Story = StoryObj<typeof DetailsSidebar>;

export const Default: Story = {
  args: {
    properties: [
      { title: "Name", value: "John Doe" },
      { title: "Email", value: "john.doe@example.com" },
      { title: "Status", value: "Active" },
      { title: "Created", value: "January 15, 2024" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    properties: [
      { title: "Name", value: "John Doe" },
      { title: "Email", value: "john.doe@example.com" },
      { title: "Status", value: "Active" },
      { title: "Created", value: "January 15, 2024" },
    ],
    actions: (
      <Button variant="ghost" size="icon">
        <Icon name="edit" size={16} />
      </Button>
    ),
  },
};

export const WithComplexValues: Story = {
  args: {
    properties: [
      { title: "Name", value: "John Doe" },
      {
        title: "Tags",
        value: (
          <div className="flex gap-1 flex-wrap">
            <span className="px-2 py-1 bg-muted rounded text-xs">Tag 1</span>
            <span className="px-2 py-1 bg-muted rounded text-xs">Tag 2</span>
            <span className="px-2 py-1 bg-muted rounded text-xs">Tag 3</span>
          </div>
        ),
      },
      { title: "Status", value: "Active" },
      {
        title: "Description",
        value:
          "This is a longer description that might wrap to multiple lines.",
      },
    ],
  },
};

export const ManyProperties: Story = {
  args: {
    properties: [
      { title: "Name", value: "John Doe" },
      { title: "Email", value: "john.doe@example.com" },
      { title: "Phone", value: "+1 (555) 123-4567" },
      { title: "Status", value: "Active" },
      { title: "Role", value: "Administrator" },
      { title: "Department", value: "Engineering" },
      { title: "Created", value: "January 15, 2024" },
      { title: "Last updated", value: "March 20, 2024" },
    ],
  },
};
