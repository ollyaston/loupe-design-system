import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DataGrid,
  DataGridColumn,
  DataGridProps,
} from "@/design-system/data-grid";
import { Container } from "@/components/layouts/container";

// Sample data
interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  plan: string;
  createdAt: string;
}

const sampleCustomers: Customer[] = [
  {
    id: "cust_001",
    name: "Acme corp",
    email: "contact@acme.com",
    status: "active",
    plan: "Enterprise",
    createdAt: "2024-01-15",
  },
  {
    id: "cust_002",
    name: "Techstart inc",
    email: "hello@techstart.io",
    status: "active",
    plan: "Pro",
    createdAt: "2024-02-20",
  },
  {
    id: "cust_003",
    name: "Global systems",
    email: "info@globalsys.com",
    status: "inactive",
    plan: "Basic",
    createdAt: "2023-11-05",
  },
  {
    id: "cust_004",
    name: "Startup labs",
    email: "team@startuplabs.co",
    status: "pending",
    plan: "Pro",
    createdAt: "2024-03-01",
  },
  {
    id: "cust_005",
    name: "Enterprise solutions",
    email: "sales@enterprise.com",
    status: "active",
    plan: "Enterprise",
    createdAt: "2023-08-10",
  },
];

const meta: Meta<DataGridProps<Customer>> = {
  component: DataGrid,
  title: "Tables/AgGrid/DataGrid",
  parameters: {
    docs: {
      description: {
        component:
          "A reusable data grid component built on AG Grid with design system styling. Supports built-in cell renderers for common patterns like text, monospace, links, badges, and action buttons.",
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
};

export default meta;
type Story = StoryObj<DataGridProps<Customer>>;

const basicColumns: DataGridColumn<Customer>[] = [
  {
    field: "name",
    headerName: "Customer name",
    type: "link",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "id",
    headerName: "ID",
    type: "monospace",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    type: "text",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "status",
    headerName: "Status",
    type: "badge",
    width: 120,
    cellRendererParams: {
      getBadgeConfig: (value: string, data: Customer) => {
        // Match design system badge styling
        if (data.status === "inactive") {
          return {
            label: "Inactive",
            variant: "outline" as const,
            className: "border-destructive text-destructive",
          };
        }
        if (data.status === "pending") {
          return {
            label: "Pending",
            variant: "outline" as const,
          };
        }
        return {
          label: "Active",
          variant: "secondary" as const,
        };
      },
    },
  },
  {
    field: "plan",
    headerName: "Plan",
    type: "text",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Date created",
    type: "date",
    width: 140,
  },
];

export const Basic: Story = {
  args: {
    rowData: sampleCustomers,
    columns: basicColumns,
    height: 400,
  },
};

export const WithRowClick: Story = {
  args: {
    rowData: sampleCustomers,
    columns: basicColumns,
    height: 400,
    onRowClick: (data) => {
      console.log("Row clicked:", data);
      alert(`Clicked: ${data.name}`);
    },
  },
};

export const WithActionButton: Story = {
  args: {
    rowData: sampleCustomers,
    columns: [
      ...basicColumns,
      {
        headerName: "Actions",
        type: "button",
        width: 120,
        cellRendererParams: {
          label: "View",
          variant: "outline",
          onClick: (data: Customer) => {
            console.log("Action clicked:", data);
            alert(`View: ${data.name}`);
          },
        },
      },
    ],
    height: 400,
  },
};

export const WithConditionalButton: Story = {
  args: {
    rowData: sampleCustomers,
    columns: [
      ...basicColumns,
      {
        headerName: "Actions",
        type: "button",
        width: 120,
        cellRendererParams: {
          shouldShow: (data: Customer) => data.status === "pending",
          label: "Approve",
          variant: "default",
          onClick: (data: Customer) => {
            alert(`Approving: ${data.name}`);
          },
        },
      },
    ],
    height: 400,
  },
};

export const NoPagination: Story = {
  args: {
    rowData: sampleCustomers.slice(0, 3),
    columns: basicColumns,
    height: 300,
    pagination: false,
  },
};

export const CustomPageSize: Story = {
  args: {
    rowData: [
      ...sampleCustomers,
      ...sampleCustomers.map((c) => ({ ...c, id: c.id + "_2" })),
      ...sampleCustomers.map((c) => ({ ...c, id: c.id + "_3" })),
    ],
    columns: basicColumns,
    height: 500,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
  },
};

export const Loading: Story = {
  args: {
    rowData: [],
    columns: basicColumns,
    height: 400,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    rowData: [],
    columns: basicColumns,
    height: 400,
    emptyMessage: "No customers found",
  },
};
