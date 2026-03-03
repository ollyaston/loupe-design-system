/* eslint-disable agent-loupe-ui/sentence-case */

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";

import {
  DataTableWrapper,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTable,
  DataTableColumnHeader,
} from "../../design-system/data-table";
import { Container } from "@/components/layouts/container";
import { Heading } from "../../design-system/heading";
import { Button } from "../../design-system/button";
import { Search } from "../../design-system/search";
import { Icon } from "../../design-system/icon";
import { Combobox } from "../../design-system/combobox";
import { Pagination } from "../../design-system/pagination";

const meta: Meta<typeof DataTableWrapper> = {
  component: DataTableWrapper,
  parameters: {
    docs: {
      description: {
        component: "For large complex data that dominates the page.",
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
type Story = StoryObj<typeof DataTableWrapper>;

export const KitchenSink: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow onClick={() => alert("Row clicked!")}>
          <DataTableCell gem="agents" href="/test-link">
            John Doe
          </DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell>London</DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell gem="orders" href="/test-link">
            Jane Smith
          </DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell>New York</DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const Basic: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell>John Doe</DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell>London</DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell>Jane Smith</DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell>New York</DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell href="/test-link">John Doe</DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell>London</DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell href="/test-link">Jane Smith</DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell>New York</DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const ClickableRows: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow onClick={() => alert("Clickable row!")}>
          <DataTableCell>John Doe</DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell>London</DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow onClick={() => alert("Row clicked!")}>
          <DataTableCell>Jane Smith</DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell>New York</DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const WithLinksAndClickableRows: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow onClick={() => alert("Row clicked!")}>
          <DataTableCell href="/test-link">John Doe</DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell>London</DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow onClick={() => alert("Row clicked!")}>
          <DataTableCell href="/test-link">Jane Smith</DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell>New York</DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const WithGems: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell gem="agents">John Doe</DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell>London</DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell gem="orders">Jane Smith</DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell>New York</DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const WithLongText: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell>John Doe</DataTableCell>
          <DataTableCell>Active</DataTableCell>
          <DataTableCell wrapText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </DataTableCell>
          <DataTableCell monospace>$1,000</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell>Jane Smith</DataTableCell>
          <DataTableCell>Pending</DataTableCell>
          <DataTableCell wrapText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </DataTableCell>
          <DataTableCell monospace>$2,500</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const WithMonospaceText: Story = {
  render: () => (
    <DataTableWrapper>
      <DataTableHeader>
        <DataTableRow header>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Code</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Amount</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell>John Doe</DataTableCell>
          <DataTableCell monospace>CODE_123</DataTableCell>
          <DataTableCell monospace>London</DataTableCell>
          <DataTableCell monospace>$1,000.00</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableCell>Jane Smith</DataTableCell>
          <DataTableCell monospace>CODE_456</DataTableCell>
          <DataTableCell monospace>New York</DataTableCell>
          <DataTableCell monospace>$2,500.00</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTableWrapper>
  ),
};

export const WithSortableColumns: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
      {
        id: 4,
        name: "Jane Doe",
        status: "Active",
        location: "Chicago",
        amount: 3200,
        date: "2023-02-14",
      },
      {
        id: 5,
        name: "Jane Doe",
        status: "Pending",
        location: "Boston",
        amount: 800,
        date: "2023-04-01",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        defaultSorting={[{ id: "name", desc: false }]}
      />
    );
  },
};

export const WithExpandingRows: Story = {
  render: () => {
    const data: any[] = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: "$1,000",
        subRows: [
          {
            id: "1-1",
            name: "Jane Doe",
            status: "Active",
            location: "London",
            amount: "$1,000",
          },
        ],
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: "$2,500",
        subRows: [
          {
            id: "2-1",
            name: "Jane Doe",
            status: "Active",
            location: "London",
            amount: "$1,000",
          },
          {
            id: "2-2",
            name: "Jane Doe",
            status: "Pending",
            location: "New York",
            amount: "$2,500",
          },
        ],
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: "$1,750",
        subRows: [
          {
            id: "3-1",
            name: "Jane Doe",
            status: "Inactive",
            location: "San Francisco",
            amount: "$1,750",
          },
        ],
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }: { getValue: () => string }) => (
          <span className="font-mono">{getValue()}</span>
        ),
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        getRowCanExpand={(row) =>
          row.original.subRows && row.original.subRows.length > 0
        }
        getSubRows={(row) => row.subRows}
      />
    );
  },
};

export const WithNestedRows: Story = {
  render: () => {
    const data: any[] = [
      {
        id: 1,
        name: "Engineering Department",
        status: "Active",
        location: "San Francisco",
        amount: "$50,000",
        subRows: [
          {
            id: "1-1",
            name: "Frontend Team",
            status: "Active",
            location: "San Francisco",
            amount: "$25,000",
            subRows: [
              {
                id: "1-1-1",
                name: "React Developers",
                status: "Active",
                location: "San Francisco",
                amount: "$15,000",
                subRows: [
                  {
                    id: "1-1-1-1",
                    name: "John Smith",
                    status: "Active",
                    location: "San Francisco",
                    amount: "$8,000",
                  },
                  {
                    id: "1-1-1-2",
                    name: "Sarah Johnson",
                    status: "Active",
                    location: "San Francisco",
                    amount: "$7,000",
                  },
                ],
              },
              {
                id: "1-1-2",
                name: "UI/UX Designers",
                status: "Active",
                location: "San Francisco",
                amount: "$10,000",
                subRows: [
                  {
                    id: "1-1-2-1",
                    name: "Mike Chen",
                    status: "Active",
                    location: "San Francisco",
                    amount: "$10,000",
                  },
                ],
              },
            ],
          },
          {
            id: "1-2",
            name: "Backend Team",
            status: "Active",
            location: "San Francisco",
            amount: "$25,000",
            subRows: [
              {
                id: "1-2-1",
                name: "API Developers",
                status: "Active",
                location: "San Francisco",
                amount: "$15,000",
                subRows: [
                  {
                    id: "1-2-1-1",
                    name: "Alex Rodriguez",
                    status: "Active",
                    location: "San Francisco",
                    amount: "$8,000",
                  },
                  {
                    id: "1-2-1-2",
                    name: "Emily Davis",
                    status: "Active",
                    location: "San Francisco",
                    amount: "$7,000",
                  },
                ],
              },
              {
                id: "1-2-2",
                name: "Database Engineers",
                status: "Active",
                location: "San Francisco",
                amount: "$10,000",
                subRows: [
                  {
                    id: "1-2-2-1",
                    name: "David Wilson",
                    status: "Active",
                    location: "San Francisco",
                    amount: "$10,000",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Marketing Department",
        status: "Active",
        location: "New York",
        amount: "$30,000",
        subRows: [
          {
            id: "2-1",
            name: "Digital Marketing",
            status: "Active",
            location: "New York",
            amount: "$20,000",
            subRows: [
              {
                id: "2-1-1",
                name: "Social Media Team",
                status: "Active",
                location: "New York",
                amount: "$12,000",
                subRows: [
                  {
                    id: "2-1-1-1",
                    name: "Lisa Thompson",
                    status: "Active",
                    location: "New York",
                    amount: "$6,000",
                  },
                  {
                    id: "2-1-1-2",
                    name: "Tom Anderson",
                    status: "Active",
                    location: "New York",
                    amount: "$6,000",
                  },
                ],
              },
              {
                id: "2-1-2",
                name: "Content Team",
                status: "Active",
                location: "New York",
                amount: "$8,000",
                subRows: [
                  {
                    id: "2-1-2-1",
                    name: "Rachel Green",
                    status: "Active",
                    location: "New York",
                    amount: "$8,000",
                  },
                ],
              },
            ],
          },
          {
            id: "2-2",
            name: "Traditional Marketing",
            status: "Active",
            location: "New York",
            amount: "$10,000",
            subRows: [
              {
                id: "2-2-1",
                name: "Print & Media",
                status: "Active",
                location: "New York",
                amount: "$10,000",
                subRows: [
                  {
                    id: "2-2-1-1",
                    name: "Kevin Martinez",
                    status: "Active",
                    location: "New York",
                    amount: "$10,000",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }: { getValue: () => string }) => (
          <span className="font-mono">{getValue()}</span>
        ),
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        getRowCanExpand={(row) =>
          row.original.subRows && row.original.subRows.length > 0
        }
        getSubRows={(row) => row.subRows}
      />
    );
  },
};

export const WithBorder: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
      {
        id: 4,
        name: "Alice Brown",
        status: "Active",
        location: "Chicago",
        amount: 3200,
        date: "2023-02-14",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
      />
    );
  },
};

export const WithHeadingAndControls: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "Acme Corporation",
        status: "Active",
        location: "New York",
        amount: 15000,
        date: "2023-01-15",
        type: "Enterprise",
      },
      {
        id: 2,
        name: "TechStart Inc",
        status: "Pending",
        location: "San Francisco",
        amount: 8500,
        date: "2023-03-22",
        type: "Startup",
      },
      {
        id: 3,
        name: "Global Solutions Ltd",
        status: "Active",
        location: "London",
        amount: 22000,
        date: "2022-11-08",
        type: "Enterprise",
      },
      {
        id: 4,
        name: "Innovation Labs",
        status: "Inactive",
        location: "Boston",
        amount: 12000,
        date: "2023-02-14",
        type: "SMB",
      },
      {
        id: 5,
        name: "Future Systems",
        status: "Active",
        location: "Seattle",
        amount: 18500,
        date: "2023-04-01",
        type: "Enterprise",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }: any) => {
          const name = row.getValue("name");
          return <div className="font-medium">{name}</div>;
        },
      },
      {
        accessorKey: "type",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Revenue" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <div className="space-y-6">
        <Heading
          size="section"
          title="Customers"
          actionsContent={
            <>
              <Search placeholder="Search customers..." className="w-64" />
              <Button>
                <Icon name="add" size={16} />
                New customer
              </Button>
            </>
          }
        />
        <DataTable
          columns={columns}
          data={data}
          onRowClick={(row) => alert(`Clicked on ${row.name}`)}
          bordered={true}
          defaultSorting={[{ id: "name", desc: false }]}
        />
        <Pagination
          currentPage={1}
          totalPages={10}
          pageHref={(page) => `#${page}`}
          previousHref="#"
          nextHref="#"
        />
      </div>
    );
  },
};

export const WithSingleFilterInHeading: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "Acme Corporation",
        status: "Active",
        location: "New York",
        amount: 15000,
        date: "2023-01-15",
        type: "Enterprise",
      },
      {
        id: 2,
        name: "TechStart Inc",
        status: "Pending",
        location: "San Francisco",
        amount: 8500,
        date: "2023-03-22",
        type: "Startup",
      },
      {
        id: 3,
        name: "Global Solutions Ltd",
        status: "Active",
        location: "London",
        amount: 22000,
        date: "2022-11-08",
        type: "Enterprise",
      },
      {
        id: 4,
        name: "Innovation Labs",
        status: "Inactive",
        location: "Boston",
        amount: 12000,
        date: "2023-02-14",
        type: "SMB",
      },
      {
        id: 5,
        name: "Future Systems",
        status: "Active",
        location: "Seattle",
        amount: 18500,
        date: "2023-04-01",
        type: "Enterprise",
      },
    ];

    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Inactive", label: "Inactive" },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }: any) => {
          const name = row.getValue("name");
          return <div className="font-medium">{name}</div>;
        },
      },
      {
        accessorKey: "type",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Revenue" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <div className="space-y-6">
        <Heading
          size="section"
          title="Customers"
          actionsContent={
            <>
              <Search placeholder="Search customers..." className="w-64" />
              <Combobox
                options={statusOptions}
                placeholder="Filter by status"
                className="w-48"
              />
              <Button>
                <Icon name="add" size={16} />
                New customer
              </Button>
            </>
          }
        />
        <DataTable
          columns={columns}
          data={data}
          onRowClick={(row) => alert(`Clicked on ${row.name}`)}
          bordered={true}
          defaultSorting={[{ id: "name", desc: false }]}
        />
        <Pagination
          currentPage={1}
          totalPages={10}
          pageHref={(page) => `#${page}`}
          previousHref="#"
          nextHref="#"
        />
      </div>
    );
  },
};

export const WithFiltersBelowHeading: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "Acme Corporation",
        status: "Active",
        location: "New York",
        amount: 15000,
        date: "2023-01-15",
        type: "Enterprise",
      },
      {
        id: 2,
        name: "TechStart Inc",
        status: "Pending",
        location: "San Francisco",
        amount: 8500,
        date: "2023-03-22",
        type: "Startup",
      },
      {
        id: 3,
        name: "Global Solutions Ltd",
        status: "Active",
        location: "London",
        amount: 22000,
        date: "2022-11-08",
        type: "Enterprise",
      },
      {
        id: 4,
        name: "Innovation Labs",
        status: "Inactive",
        location: "Boston",
        amount: 12000,
        date: "2023-02-14",
        type: "SMB",
      },
      {
        id: 5,
        name: "Future Systems",
        status: "Active",
        location: "Seattle",
        amount: 18500,
        date: "2023-04-01",
        type: "Enterprise",
      },
      {
        id: 6,
        name: "StartupCo",
        status: "Pending",
        location: "Austin",
        amount: 5000,
        date: "2023-05-15",
        type: "Startup",
      },
      {
        id: 7,
        name: "Local Business",
        status: "Inactive",
        location: "Denver",
        amount: 3000,
        date: "2023-01-30",
        type: "SMB",
      },
    ];

    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Inactive", label: "Inactive" },
    ];

    const typeOptions = [
      { value: "", label: "All Types" },
      { value: "Enterprise", label: "Enterprise" },
      { value: "Startup", label: "Startup" },
      { value: "SMB", label: "SMB" },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }: any) => {
          const name = row.getValue("name");
          return <div className="font-medium">{name}</div>;
        },
      },
      {
        accessorKey: "type",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Revenue" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <div className="space-y-6">
        <Heading
          size="section"
          title="Customers"
          actionsContent={
            <>
              <Search placeholder="Search customers..." className="w-64" />
              <Button>
                <Icon name="add" size={16} />
                New customer
              </Button>
            </>
          }
        />
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Combobox
              options={statusOptions}
              placeholder="Filter by status"
              className="w-48"
            />
          </div>
          <div className="flex items-center gap-2">
            <Combobox
              options={typeOptions}
              placeholder="Filter by type"
              className="w-48"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing 7 customers
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onRowClick={(row) => alert(`Clicked on ${row.name}`)}
          bordered={true}
          defaultSorting={[{ id: "name", desc: false }]}
        />
        <Pagination
          currentPage={1}
          totalPages={10}
          pageHref={(page) => `#${page}`}
          previousHref="#"
          nextHref="#"
        />
      </div>
    );
  },
};

export const WithHorizontalScroll: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        status: "Active",
        department: "Engineering",
        location: "San Francisco",
        phone: "+1 (555) 123-4567",
        hireDate: "2022-01-15",
        salary: 95000,
        manager: "Sarah Wilson",
        projects: "Project Alpha, Project Beta",
        skills: "React, TypeScript, Node.js",
        lastLogin: "2023-12-01 09:30:00",
        performance: "Excellent",
        team: "Frontend Team",
        office: "SF-001",
        badge: "ID-12345",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        status: "Active",
        department: "Marketing",
        location: "New York",
        phone: "+1 (555) 234-5678",
        hireDate: "2021-06-20",
        salary: 78000,
        manager: "Mike Johnson",
        projects: "Campaign X, Campaign Y",
        skills: "Digital Marketing, Analytics",
        lastLogin: "2023-12-01 08:45:00",
        performance: "Good",
        team: "Digital Marketing Team",
        office: "NY-002",
        badge: "ID-12346",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        status: "Inactive",
        department: "Sales",
        location: "Chicago",
        phone: "+1 (555) 345-6789",
        hireDate: "2020-03-10",
        salary: 82000,
        manager: "Lisa Brown",
        projects: "Enterprise Sales, SMB Sales",
        skills: "CRM, Negotiation, Leadership",
        lastLogin: "2023-11-28 16:20:00",
        performance: "Average",
        team: "Enterprise Sales Team",
        office: "CHI-003",
        badge: "ID-12347",
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        status: "Active",
        department: "HR",
        location: "Austin",
        phone: "+1 (555) 456-7890",
        hireDate: "2023-02-01",
        salary: 65000,
        manager: "David Wilson",
        projects: "Recruitment, Training",
        skills: "HRIS, Employee Relations",
        lastLogin: "2023-12-01 10:15:00",
        performance: "Excellent",
        team: "People Operations",
        office: "AUS-004",
        badge: "ID-12348",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell gem="agents" href={`/employee/${row.getValue("id")}`}>
            {row.getValue("name")}
          </DataTableCell>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Department" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "phone",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell monospace>{row.getValue("phone")}</DataTableCell>
        ),
      },
      {
        accessorKey: "hireDate",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Hire Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("hireDate");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "salary",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Salary" />
        ),
        cell: ({ row }: any) => {
          const salary = row.getValue("salary");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(salary as number);
          return <DataTableCell monospace>{formatted}</DataTableCell>;
        },
      },
      {
        accessorKey: "manager",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Manager" />
        ),
      },
      {
        accessorKey: "projects",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Projects" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell wrapText>{row.getValue("projects")}</DataTableCell>
        ),
      },
      {
        accessorKey: "skills",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Skills" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell wrapText>{row.getValue("skills")}</DataTableCell>
        ),
      },
      {
        accessorKey: "lastLogin",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Last Login" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell monospace>{row.getValue("lastLogin")}</DataTableCell>
        ),
      },
      {
        accessorKey: "performance",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Performance" />
        ),
      },
      {
        accessorKey: "team",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Team" />
        ),
      },
      {
        accessorKey: "office",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Office" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell monospace>{row.getValue("office")}</DataTableCell>
        ),
      },
      {
        accessorKey: "badge",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Badge ID" />
        ),
        cell: ({ row }: any) => (
          <DataTableCell monospace>{row.getValue("badge")}</DataTableCell>
        ),
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
      />
    );
  },
};

export const WithRowSelection: Story = {
  render: function WithRowSelectionStory() {
    const [rowSelection, setRowSelection] = React.useState({});

    const data = [
      {
        id: "1",
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
      },
      {
        id: "2",
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
      },
      {
        id: "3",
        name: "Bob Johnson",
        status: "Active",
        location: "San Francisco",
        amount: 1500,
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }: { row: any }) => (
          <a
            href={`/contacts/${row.original.id}`}
            className="hover:underline cursor-pointer text-info"
          >
            {row.original.name}
          </a>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }: { row: any }) => row.original.status,
      },
      {
        accessorKey: "location",
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }: { row: any }) => row.original.location,
      },
      {
        accessorKey: "amount",
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: { row: any }) => (
          <span className="font-mono">
            ${row.original.amount.toLocaleString()}
          </span>
        ),
      },
    ];

    const selectedRows = Object.keys(rowSelection).length;

    return (
      <div className="space-y-4">
        {selectedRows > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Selected ({selectedRows})
            </Button>
            <Button variant="outline" size="sm">
              Delete Selected ({selectedRows})
            </Button>
          </div>
        )}

        <DataTable
          columns={columns}
          data={data}
          enableRowSelection={true}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => row.id}
          bordered={true}
        />
      </div>
    );
  },
};

export const WithTextTruncation: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "Acme Corporation",
        description:
          "A very long company description that should be truncated with ellipsis when it exceeds the maximum width",
        status: "Active",
        location: "New York",
        amount: 15000,
        email: "contact@acmecorporation.com",
      },
      {
        id: 2,
        name: "TechStart Inc",
        description:
          "Another extremely long description that demonstrates text truncation behavior in data tables",
        status: "Pending",
        location: "San Francisco",
        amount: 8500,
        email: "hello@techstartinc.com",
      },
      {
        id: 3,
        name: "Global Solutions Ltd",
        description: "Short description",
        status: "Active",
        location: "London",
        amount: 22000,
        email: "info@globalsolutions.co.uk",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }: any) => {
          const name = row.getValue("name");
          return <div className="font-medium">{name}</div>;
        },
      },
      {
        accessorKey: "description",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }: any) => row.getValue("description"),
      },
      {
        accessorKey: "email",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }: any) => row.getValue("email"),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Revenue" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        cellMaxWidth={200}
        bordered={true}
      />
    );
  },
};

export const WithTextWrappingOverride: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "Project Alpha",
        description:
          "This is a very long project description that should wrap to multiple lines instead of being truncated",
        status: "In Progress",
        team: "Engineering Team",
        notes:
          "Important project notes that contain detailed information about the project requirements and specifications",
      },
      {
        id: 2,
        name: "Project Beta",
        description:
          "Another long description that demonstrates text wrapping behavior when the wrapText prop is used",
        status: "Planning",
        team: "Product Team",
        notes:
          "Additional notes with multiple lines of important information that should be displayed in full",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Project" />
        ),
        cell: ({ row }: any) => {
          const name = row.getValue("name");
          return <div className="font-medium">{name}</div>;
        },
      },
      {
        accessorKey: "description",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }: any) => row.getValue("description"),
        meta: {
          cellProps: {
            wrapText: true,
          },
        },
      },
      {
        accessorKey: "notes",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Notes" />
        ),
        cell: ({ row }: any) => row.getValue("notes"),
        meta: {
          cellProps: {
            wrapText: true,
          },
        },
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "team",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Team" />
        ),
      },
    ];

    return <DataTable columns={columns} data={data} bordered={true} />;
  },
};

export const WithMixedTruncationAndWrapping: Story = {
  render: () => {
    const data = [
      {
        id: 1,
        name: "Customer Support Ticket #12345",
        description:
          "This is a very long ticket description that should be truncated to fit within the specified width",
        fullDescription:
          "This is the complete ticket description that contains all the details about the customer's issue. It includes multiple paragraphs of information that would normally be truncated but here we want to show the full content by using text wrapping.",
        status: "Open",
        priority: "High",
        assignee: "support@company.com",
      },
      {
        id: 2,
        name: "Bug Report #67890",
        description: "Another long description that should be truncated",
        fullDescription:
          "Complete bug report with detailed steps to reproduce, expected behavior, actual behavior, and environment information. This content should wrap to show all details.",
        status: "In Progress",
        priority: "Medium",
        assignee: "dev@company.com",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Ticket" />
        ),
        cell: ({ row }: any) => {
          const name = row.getValue("name");
          return <div className="font-medium">{name}</div>;
        },
      },
      {
        accessorKey: "description",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Summary (Truncated)" />
        ),
        cell: ({ row }: any) => row.getValue("description"),
      },
      {
        accessorKey: "fullDescription",
        header: ({ column }: any) => (
          <DataTableColumnHeader
            column={column}
            title="Full Description (Wrapped)"
          />
        ),
        cell: ({ row }: any) => row.getValue("fullDescription"),
        meta: {
          cellProps: {
            wrapText: true,
          },
        },
      },
      {
        accessorKey: "assignee",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Assignee" />
        ),
        cell: ({ row }: any) => row.getValue("assignee"),
        meta: {
          cellProps: {
            monospace: true,
          },
        },
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "priority",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Priority" />
        ),
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        cellMaxWidth={150}
        bordered={true}
      />
    );
  },
};

export const WithSearch: Story = {
  render: function WithSearchStory() {
    const [searchValue, setSearchValue] = React.useState("");

    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
      {
        id: 4,
        name: "Alice Brown",
        status: "Active",
        location: "Chicago",
        amount: 3200,
        date: "2023-02-14",
      },
    ];

    const filteredData = React.useMemo(() => {
      if (!searchValue) return data;
      const lowerSearch = searchValue.toLowerCase();
      return data.filter(
        (row) =>
          row.name.toLowerCase().includes(lowerSearch) ||
          row.status.toLowerCase().includes(lowerSearch) ||
          row.location.toLowerCase().includes(lowerSearch),
      );
    }, [searchValue]);

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    const itemCount = filteredData.length;
    const itemCountText = itemCount === 1 ? "1 item" : `${itemCount} items`;

    return (
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        showSearch={true}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        searchPlaceholder="Search by name, status, or location..."
        searchValue={searchValue}
        itemCountContent={itemCountText}
      />
    );
  },
};

export const WithFilterContent: Story = {
  render: function WithFilterContentStory() {
    const [statusFilter, setStatusFilter] = React.useState("");

    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
      {
        id: 4,
        name: "Alice Brown",
        status: "Active",
        location: "Chicago",
        amount: 3200,
        date: "2023-02-14",
      },
    ];

    const filteredData = React.useMemo(() => {
      if (!statusFilter) return data;
      return data.filter((row) => row.status === statusFilter);
    }, [statusFilter]);

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Inactive", label: "Inactive" },
    ];

    return (
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        title="Customers"
        filterContent={
          <Combobox
            options={statusOptions}
            placeholder="Filter by status"
            className="w-48"
            value={statusFilter}
            onValueChange={setStatusFilter}
          />
        }
      />
    );
  },
};

export const WithFilterContentAndSearch: Story = {
  render: function WithFilterContentAndSearchStory() {
    const [searchValue, setSearchValue] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("");

    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
      {
        id: 4,
        name: "Alice Brown",
        status: "Active",
        location: "Chicago",
        amount: 3200,
        date: "2023-02-14",
      },
    ];

    const filteredData = React.useMemo(() => {
      let result = data;

      if (statusFilter) {
        result = result.filter((row) => row.status === statusFilter);
      }

      if (searchValue) {
        const lowerSearch = searchValue.toLowerCase();
        result = result.filter(
          (row) =>
            row.name.toLowerCase().includes(lowerSearch) ||
            row.location.toLowerCase().includes(lowerSearch),
        );
      }

      return result;
    }, [searchValue, statusFilter]);

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Inactive", label: "Inactive" },
    ];

    return (
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        title="Customers"
        filterContent={
          <Combobox
            options={statusOptions}
            placeholder="Filter by status"
            className="w-48"
            value={statusFilter}
            onValueChange={setStatusFilter}
          />
        }
        showSearch={true}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        searchPlaceholder="Search by name or location..."
        searchValue={searchValue}
      />
    );
  },
};

export const WithTitle: Story = {
  render: function WithTitleStory() {
    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        title="Customers"
      />
    );
  },
};

export const WithPrimaryAction: Story = {
  render: function WithPrimaryActionStory() {
    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
    ];

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    return (
      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        primaryActionContent={
          <Button>
            <Icon name="add" size={16} />
            Add
          </Button>
        }
      />
    );
  },
};

export const WithPrimaryActionAndSearch: Story = {
  render: function WithPrimaryActionAndSearchStory() {
    const [searchValue, setSearchValue] = React.useState("");

    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
    ];

    const filteredData = React.useMemo(() => {
      if (!searchValue) return data;
      const lowerSearch = searchValue.toLowerCase();
      return data.filter(
        (row) =>
          row.name.toLowerCase().includes(lowerSearch) ||
          row.status.toLowerCase().includes(lowerSearch) ||
          row.location.toLowerCase().includes(lowerSearch),
      );
    }, [searchValue]);

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    const itemCount = filteredData.length;
    const itemCountText = itemCount === 1 ? "1 item" : `${itemCount} items`;

    return (
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        showSearch={true}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        searchPlaceholder="Search by name, status, or location..."
        searchValue={searchValue}
        itemCountContent={itemCountText}
        primaryActionContent={
          <Button>
            <Icon name="add" size={16} />
            Add
          </Button>
        }
      />
    );
  },
};

export const WithTitleCountSearchFilterAndAction: Story = {
  render: function WithTitleCountSearchFilterAndActionStory() {
    const [searchValue, setSearchValue] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("");

    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Active",
        location: "London",
        amount: 1000,
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Pending",
        location: "New York",
        amount: 2500,
        date: "2023-03-22",
      },
      {
        id: 3,
        name: "Bob Johnson",
        status: "Inactive",
        location: "San Francisco",
        amount: 1750,
        date: "2022-11-08",
      },
      {
        id: 4,
        name: "Alice Brown",
        status: "Active",
        location: "Chicago",
        amount: 3200,
        date: "2023-02-14",
      },
      {
        id: 5,
        name: "Charlie Wilson",
        status: "Pending",
        location: "Boston",
        amount: 2100,
        date: "2023-04-10",
      },
    ];

    const filteredData = React.useMemo(() => {
      let result = data;

      if (statusFilter) {
        result = result.filter((row) => row.status === statusFilter);
      }

      if (searchValue) {
        const lowerSearch = searchValue.toLowerCase();
        result = result.filter(
          (row) =>
            row.name.toLowerCase().includes(lowerSearch) ||
            row.location.toLowerCase().includes(lowerSearch),
        );
      }

      return result;
    }, [searchValue, statusFilter]);

    const columns = [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }: any) => {
          const amount = row.getValue("amount");
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount as number);
          return <span className="font-mono">{formatted}</span>;
        },
      },
      {
        accessorKey: "date",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }: any) => {
          const date = row.getValue("date");
          const formatted = new Date(date as string).toLocaleDateString();
          return <span className="font-mono">{formatted}</span>;
        },
      },
    ];

    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Inactive", label: "Inactive" },
    ];

    const itemCount = filteredData.length;
    const itemCountText =
      itemCount === 1 ? "1 customer" : `${itemCount} customers`;

    return (
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        bordered={true}
        defaultSorting={[{ id: "name", desc: false }]}
        title="Customers"
        itemCountContent={itemCountText}
        showSearch={true}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        searchPlaceholder="Search by name or location..."
        searchValue={searchValue}
        filterContent={
          <Combobox
            options={statusOptions}
            placeholder="Filter by status"
            className="w-48"
            value={statusFilter}
            onValueChange={setStatusFilter}
          />
        }
        primaryActionContent={
          <Button>
            <Icon name="add" size={16} />
            New customer
          </Button>
        }
      />
    );
  },
};
