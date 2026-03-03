import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TableEmptyState } from "../../components/table-empty-state";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof TableEmptyState> = {
  component: TableEmptyState,
  parameters: {
    docs: {
      description: {
        component:
          "A table empty state component that displays appropriate messages and call-to-action buttons when tables have no data. Use preset types for common patterns, or type 'custom' with title/description/cta for app-specific copy.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: [
        "items",
        "data",
        "results",
        "team",
        "integrations",
        "records",
        "custom",
      ],
      description: "Type of empty state to display",
    },
    onCtaClick: {
      action: "cta-clicked",
      description: "Callback function when CTA button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableEmptyState>;

export const Items: Story = {
  args: {
    type: "items",
    onCtaClick: () => console.log("Add item clicked"),
  },
};

export const Data: Story = {
  args: {
    type: "data",
    onCtaClick: () => console.log("Connect data clicked"),
  },
};

export const Results: Story = {
  args: {
    type: "results",
    onCtaClick: () => console.log("Clear filters clicked"),
  },
};

export const Team: Story = {
  args: {
    type: "team",
    onCtaClick: () => console.log("Invite team clicked"),
  },
};

export const Integrations: Story = {
  args: {
    type: "integrations",
    onCtaClick: () => console.log("Connect integration clicked"),
  },
};

export const Records: Story = {
  args: {
    type: "records",
    onCtaClick: () => console.log("Add record clicked"),
  },
};

export const Custom: Story = {
  args: {
    type: "custom",
    title: "No projects in this workspace",
    description:
      "Create a project to organize your work and collaborate with your team.",
    cta: "Create project",
    onCtaClick: () => console.log("Create project clicked"),
  },
};

export const WithOverride: Story = {
  args: {
    type: "items",
    title: "No customers yet",
    description: "Add your first customer to start managing relationships.",
    cta: "Add customer",
    onCtaClick: () => console.log("Add customer clicked"),
  },
};

export const WithoutCta: Story = {
  args: {
    type: "items",
  },
};

export const InTableContext: Story = {
  render: (args) => (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Project list</h2>
      </div>
      <div className="p-4">
        <TableEmptyState {...args} />
      </div>
    </div>
  ),
  args: {
    type: "items",
    onCtaClick: () => console.log("Add item clicked"),
  },
};

export const MultipleStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Items</h2>
        </div>
        <div className="p-4">
          <TableEmptyState
            type="items"
            onCtaClick={() => console.log("Add item clicked")}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">No search results</h2>
        </div>
        <div className="p-4">
          <TableEmptyState
            type="results"
            onCtaClick={() => console.log("Clear filters clicked")}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Data source</h2>
        </div>
        <div className="p-4">
          <TableEmptyState
            type="data"
            onCtaClick={() => console.log("Connect data clicked")}
          />
        </div>
      </div>
    </div>
  ),
};
