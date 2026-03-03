import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GridAIInput } from "@/design-system/grid-ai-input";
import { Container } from "@/components/layouts/container";
import { useState } from "react";

const meta: Meta<typeof GridAIInput> = {
  title: "Tables/AgGrid/GridAIInput",
  component: GridAIInput,
  parameters: {
    docs: {
      description: {
        component:
          "AI-powered input for querying AG Grid data using natural language. Use alongside AgGrid to filter, sort, and navigate data with text queries.",
      },
    },
    layout: "padded",
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
type Story = StoryObj<typeof GridAIInput>;

// Mock grid API for stories
const mockGridApi = {
  getState: () => ({ filter: {}, sort: [] }),
  setFilterModel: () => {},
  applyColumnState: () => {},
};

// Mock query handler
const mockOnQuery = async (params: { query: string }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock response based on query
  if (params.query.toLowerCase().includes("active")) {
    return {
      gridState: {
        filter: {
          status: { filterType: "text", type: "equals", filter: "active" },
        },
      },
      propertiesToIgnore: [],
      explanation: "Showing only active customers",
    };
  }

  if (params.query.toLowerCase().includes("hve")) {
    return {
      gridState: {
        sort: [{ colId: "hve", sort: "desc" as const }],
      },
      propertiesToIgnore: [],
      explanation: "Sorted by HVE (highest first)",
    };
  }

  return {
    gridState: {},
    propertiesToIgnore: [],
    explanation: "Query processed",
  };
};

const mockColumns = [
  { field: "name", headerName: "Name", description: "Customer company name" },
  {
    field: "status",
    headerName: "Status",
    description: "Customer status: active, churned, or draft",
  },
  {
    field: "hve",
    headerName: "HVE",
    description: "Human Value Equivalent - total revenue value",
  },
];

/**
 * Default collapsed state - shows just the AI button
 */
export const Default: Story = {
  args: {
    gridApi: mockGridApi as any,
    columns: mockColumns,
    onQuery: mockOnQuery,
  },
};

/**
 * Disabled state when grid is not ready
 */
export const Disabled: Story = {
  args: {
    gridApi: null,
    columns: mockColumns,
    onQuery: mockOnQuery,
    disabled: true,
  },
};

/**
 * Interactive example - click AI button to try a natural language query
 */
export const Interactive: Story = {
  render: () => {
    const [lastQuery, setLastQuery] = useState<string | null>(null);

    const handleQuery = async (params: { query: string }) => {
      setLastQuery(params.query);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        gridState: { filter: {} },
        propertiesToIgnore: [],
        explanation: `Processed: "${params.query}"`,
      };
    };

    return (
      <div className="space-y-4">
        <GridAIInput
          gridApi={mockGridApi as any}
          columns={mockColumns}
          onQuery={handleQuery}
        />
        {lastQuery && (
          <div className="text-sm text-muted-foreground">
            Last query: {lastQuery}
          </div>
        )}
      </div>
    );
  },
};
