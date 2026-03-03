import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "../../design-system/empty-state";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible empty state component that displays appropriate messages, icons, and call-to-action buttons when content areas have no data or when guiding users to take specific actions.",
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
    title: {
      control: "text",
      description: "The main title text displayed in the empty state",
    },
    description: {
      control: "text",
      description: "Optional description text below the title",
    },
    icon: {
      control: "text",
      description: "Optional icon name from the design system",
    },
    gem: {
      control: "select",
      options: [
        "agents",
        "credits",
        "customers",
        "orders",
        "invoices",
        "payments",
        "favorites",
        "signals",
        "margins",
        "workflows",
        "consumption",
        "builder",
        "blocks",
        "simulations",
        "vendors",
        "payment-methods",
        "tax",
        "events",
        "hand_coins",
        "quotes",
        "corporate_fare",
        "rev_rec",
        "assistants",
      ],
      description: "Optional gem ID to display with background",
    },
    variant: {
      control: "select",
      options: ["outline", "plain"],
      description: "Visual variant of the empty state container",
    },
    action: {
      control: "object",
      description: "Optional action button configuration",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Basic examples
export const Default: Story = {
  args: {
    title: "No items found",
    description: "Get started by adding your first item.",
    action: {
      label: "Add item",
      onClick: () => console.log("Add item clicked"),
    },
  },
};

export const WithoutAction: Story = {
  args: {
    title: "No data available",
    description: "Data will appear here once it becomes available.",
  },
};

// With icons
export const WithIcon: Story = {
  args: {
    title: "No customers yet",
    description:
      "Add your first customer to start managing relationships and tracking activity.",
    icon: "account_circle",
    action: {
      label: "Add customer",
      onClick: () => console.log("Add customer clicked"),
    },
  },
};

export const WithGem: Story = {
  args: {
    title: "No agents available",
    description:
      "Add an agent to help automate workflows or trigger actions based on data.",
    gem: "agents",
    action: {
      label: "Add agent",
      onClick: () => console.log("Add agent clicked"),
    },
  },
};

// Variant examples
export const PlainVariant: Story = {
  args: {
    title: "No customers yet",
    description:
      "Add your first customer to start managing relationships and tracking activity.",
    gem: "customers",
    variant: "plain",
    action: {
      label: "Add customer",
      onClick: () => console.log("Add customer clicked"),
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    title: "No customers yet",
    description:
      "Add your first customer to start managing relationships and tracking activity.",
    gem: "customers",
    variant: "outline",
    action: {
      label: "Add customer",
      onClick: () => console.log("Add customer clicked"),
    },
  },
};

// Common use cases with gems
export const Customers: Story = {
  args: {
    title: "No customers yet",
    description:
      "Add your first customer to start managing relationships and tracking activity.",
    gem: "customers",
    action: {
      label: "Add customer",
      onClick: () => console.log("Add customer clicked"),
    },
  },
};

export const Invoices: Story = {
  args: {
    title: "No invoices yet",
    description:
      "Invoices will appear here once you've started billing your customers.",
    gem: "invoices",
    action: {
      label: "Create invoice",
      onClick: () => console.log("Create invoice clicked"),
    },
  },
};

export const Orders: Story = {
  args: {
    title: "No orders available",
    description: "Draft and active orders will appear here.",
    gem: "orders",
    action: {
      label: "Add order",
      onClick: () => console.log("Add order clicked"),
    },
  },
};

// Status-based empty states
export const Error: Story = {
  args: {
    title: "Unable to load data",
    description: "There was an error loading your data. Please try again.",
    icon: "error",
    action: {
      label: "Try again",
      onClick: () => console.log("Try again clicked"),
    },
  },
};

export const MultipleStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Outline variant</h3>
        <EmptyState
          title="No customers yet"
          description="Add your first customer to get started."
          gem="customers"
          variant="outline"
          action={{
            label: "Add customer",
            onClick: () => console.log("Add customer clicked"),
          }}
        />
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Plain variant</h3>
        <EmptyState
          title="No products available"
          description="Create a product to begin managing pricing."
          icon="inventory"
          variant="plain"
          action={{
            label: "Create product",
            onClick: () => console.log("Create product clicked"),
          }}
        />
      </div>
    </div>
  ),
};
