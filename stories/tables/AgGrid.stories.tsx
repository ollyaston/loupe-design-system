import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AgGrid } from "../../design-system/ag-grid";
import { Container } from "@/components/layouts/container";
import { ColDef } from "ag-grid-community";

const meta: Meta<typeof AgGrid> = {
  component: AgGrid,
  parameters: {
    docs: {
      description: {
        component:
          "AG Grid React Data Grid component for displaying data with sorting capabilities and click events.",
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
type Story = StoryObj<typeof AgGrid>;

// Sample data for stories
const sampleRowData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true, year: 2023 },
  {
    make: "Ford",
    model: "F-Series",
    price: 33850,
    electric: false,
    year: 2022,
  },
  {
    make: "Toyota",
    model: "Corolla",
    price: 29600,
    electric: false,
    year: 2023,
  },
  { make: "BMW", model: "iX", price: 83900, electric: true, year: 2023 },
  { make: "Honda", model: "Civic", price: 22500, electric: false, year: 2022 },
  { make: "Audi", model: "e-tron", price: 66900, electric: true, year: 2023 },
  { make: "Mercedes", model: "EQS", price: 104400, electric: true, year: 2023 },
  { make: "Nissan", model: "Leaf", price: 28140, electric: true, year: 2022 },
];

const basicColumnDefs: ColDef[] = [
  { field: "make", headerName: "Make" },
  { field: "model", headerName: "Model" },
  {
    field: "price",
    headerName: "Price",
    valueFormatter: (params) => `$${params.value.toLocaleString()}`,
  },
  {
    field: "electric",
    headerName: "Electric",
    cellRenderer: (params: any) => (params.value ? "Yes" : "No"),
  },
  { field: "year", headerName: "Year" },
];

export const Basic: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
  },
};

export const WithSorting: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
    enableSorting: true,
  },
};

export const WithoutSorting: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
    enableSorting: false,
  },
};

export const WithEvents: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
    onGridReady: (params) => {
      console.log("Grid is ready!");
    },
    onRowClicked: (params) => {
      console.log(`Row clicked: ${params.data.make} ${params.data.model}`);
    },
    onCellClicked: (params) => {
      console.log(`Cell clicked: ${params.colDef.field} = ${params.value}`);
    },
  },
};

export const WithCellEditing: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
    enableCellEditing: true,
    onCellValueChanged: (params) => {
      console.log(
        `Cell value changed: ${params.colDef.field} = ${params.newValue}`,
      );
    },
  },
};

export const WithAdvancedCellEditing: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: [
      { field: "make", headerName: "Make", editable: true },
      { field: "model", headerName: "Model", editable: true },
      {
        field: "price",
        headerName: "Price",
        editable: true,
        valueFormatter: (params) => `$${params.value.toLocaleString()}`,
        valueParser: (params) =>
          parseInt(params.newValue.replace(/[^0-9]/g, "")),
      },
      {
        field: "electric",
        headerName: "Electric",
        editable: true,
        cellRenderer: (params: any) => (params.value ? "Yes" : "No"),
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Yes", "No"],
        },
        valueParser: (params) => params.newValue === "Yes",
      },
      { field: "year", headerName: "Year", editable: true },
    ],
    height: 400,
    enableCellEditing: true,
    onCellValueChanged: (params) => {
      console.log(
        `Cell value changed: ${params.colDef.field} = ${params.newValue}`,
      );
    },
  },
};

export const WithCustomHeight: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 300,
  },
};

export const WithCustomWidth: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
    width: "80%",
  },
};

export const WithCustomGridOptions: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: basicColumnDefs,
    height: 400,
    gridOptions: {
      suppressRowClickSelection: true,
      rowHeight: 50,
    },
  },
};
