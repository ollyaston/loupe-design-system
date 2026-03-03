import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import DetailsSidebar from "@/design-system/details-sidebar";
import { Container } from "@/components/layouts/container";
import { Button } from "@/design-system/button";
import { Badge } from "@/design-system/badge";

const meta: Meta<typeof DetailsSidebar> = {
  title: "🚧 Quarantine/DetailsSidebar",
  component: DetailsSidebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "⚠️ **PENDING DESIGN REVIEW** - This component is in quarantine awaiting designer approval before being added to the main design system.",
      },
    },
    backgrounds: {
      default: "quarantine",
      values: [{ name: "quarantine", value: "#fff3cd" }],
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    properties: {
      control: "object",
      description: "Array of sidebar properties to display",
    },
    actions: {
      control: "object",
      description: "Optional actions to display in the header",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    properties: [
      {
        title: "Name",
        value: "John Doe",
      },
      {
        title: "Email",
        value: "john.doe@example.com",
      },
      {
        title: "Role",
        value: "Administrator",
      },
      {
        title: "Status",
        value: <Badge variant="default">Active</Badge>,
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    properties: [
      {
        title: "Project name",
        value: "Website redesign",
      },
      {
        title: "Status",
        value: <Badge variant="secondary">In progress</Badge>,
      },
      {
        title: "Due date",
        value: "2024-01-15",
      },
      {
        title: "Priority",
        value: <Badge variant="destructive">High</Badge>,
      },
      {
        title: "Team members",
        value: "5 members",
      },
    ],
    actions: (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Share
        </Button>
      </div>
    ),
  },
};

export const UserProfile: Story = {
  args: {
    properties: [
      {
        title: "Profile picture",
        value: "https://github.com/shadcn.png",
      },
      {
        title: "Full name",
        value: "Sarah johnson",
      },
      {
        title: "Username",
        value: "@sarahj",
      },
      {
        title: "Email",
        value: "sarah.johnson@company.com",
      },
      {
        title: "Department",
        value: "Engineering",
      },
      {
        title: "Location",
        value: "San Francisco, CA",
      },
      {
        title: "Join date",
        value: "January 15, 2023",
      },
      {
        title: "Status",
        value: <Badge variant="default">Online</Badge>,
      },
    ],
    actions: (
      <Button size="sm" variant="outline">
        Edit profile
      </Button>
    ),
  },
};

export const ProductDetails: Story = {
  args: {
    properties: [
      {
        title: "Product ID",
        value: "PROD-12345",
      },
      {
        title: "Name",
        value: "Premium wireless headphones",
      },
      {
        title: "Category",
        value: "Electronics",
      },
      {
        title: "Price",
        value: "$299.99",
      },
      {
        title: "Stock",
        value: "47 units",
      },
      {
        title: "SKU",
        value: "PWH-2024-001",
      },
      {
        title: "Manufacturer",
        // eslint-disable-next-line agent-loupe-ui/sentence-case
        value: "Acme Inc",
      },
      {
        title: "Warranty",
        value: "2 years",
      },
      {
        title: "Status",
        value: <Badge variant="default">Available</Badge>,
      },
    ],
    actions: (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
};

export const OrderDetails: Story = {
  args: {
    properties: [
      {
        title: "Order ID",
        value: "#ORD-78901",
      },
      {
        title: "Customer",
        value: "John Doe",
      },
      {
        title: "Email",
        value: "john.doe@email.com",
      },
      {
        title: "Order date",
        value: "2024-01-10",
      },
      {
        title: "Total amount",
        value: "$156.78",
      },
      {
        title: "Payment method",
        value: "Credit card",
      },
      {
        title: "Shipping address",
        value: "123 Main St, New York, NY 10001",
      },
      {
        title: "Status",
        value: <Badge variant="secondary">Processing</Badge>,
      },
    ],
    actions: (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          View invoice
        </Button>
        <Button size="sm" variant="outline">
          Track shipment
        </Button>
      </div>
    ),
  },
};

export const TaskDetails: Story = {
  args: {
    properties: [
      {
        title: "Task title",
        value: "Implement user authentication",
      },
      {
        title: "Description",
        value:
          "Add secure login and registration functionality with JWT tokens",
      },
      {
        title: "Assignee",
        value: "John Doe",
      },
      {
        title: "Priority",
        value: <Badge variant="destructive">High</Badge>,
      },
      {
        title: "Due date",
        value: "2024-01-20",
      },
      {
        title: "Estimated hours",
        value: "16 hours",
      },
      {
        title: "Progress",
        value: "65%",
      },
      {
        title: "Status",
        value: <Badge variant="secondary">In progress</Badge>,
      },
    ],
    actions: (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit task
        </Button>
        <Button size="sm" variant="outline">
          Add comment
        </Button>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    properties: [],
  },
};

export const LongContent: Story = {
  args: {
    properties: [
      {
        title: "Short field",
        value: "Short value",
      },
      {
        title: "Long description field",
        value:
          "This is a very long description that demonstrates how the component handles longer text content. It should wrap properly and maintain good readability even with extended text.",
      },
      {
        title: "URL field",
        value: "https://www.example.com/very/long/url/path/that/might/wrap",
      },
      {
        title: "Code snippet",
        value: (
          <code className="text-sm bg-muted p-2 rounded block">
            {`function example() {
  return "This is a code snippet";
}`}
          </code>
        ),
      },
      {
        title: "Multiple items",
        value: (
          <div className="space-y-1">
            <div>• First item</div>
            <div>• Second item</div>
            <div>• Third item</div>
          </div>
        ),
      },
    ],
  },
};
