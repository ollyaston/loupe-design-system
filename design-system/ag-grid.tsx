"use client";

import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridOptions,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";

import "@/styles/ag-grid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridProps {
  rowData?: any[];
  columnDefs?: ColDef[];
  gridOptions?: GridOptions;
  height?: string | number;
  width?: string | number;
  onGridReady?: (params: any) => void;
  onRowClicked?: (params: any) => void;
  onCellClicked?: (params: any) => void;
  onCellValueChanged?: (params: any) => void;
  enableSorting?: boolean;
  enableCellEditing?: boolean;
}

const AgGrid = React.forwardRef<AgGridReact, AgGridProps>(
  (
    {
      rowData = [],
      columnDefs = [],
      gridOptions = {},
      height = 400,
      width = "100%",
      onGridReady,
      onRowClicked,
      onCellClicked,
      onCellValueChanged,
      enableSorting = true,
      enableCellEditing = false,
      ...props
    },
    ref,
  ) => {
    const defaultGridOptions: GridOptions = {
      ...gridOptions,
      theme: themeQuartz,
      defaultColDef: {
        sortable: enableSorting,
        editable: enableCellEditing,
        ...(gridOptions.defaultColDef || {}),
      },
      onGridReady,
      onRowClicked,
      onCellClicked,
      onCellValueChanged,
    };

    const gridStyle = {
      height: typeof height === "number" ? `${height}px` : height,
      width: typeof width === "number" ? `${width}px` : width,
    };

    return (
      <div
        className="loupe-system w-full h-full min-w-0 overflow-x-auto"
        style={gridStyle}
      >
        <AgGridReact
          ref={ref}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={defaultGridOptions}
          {...props}
        />
      </div>
    );
  },
);

AgGrid.displayName = "AgGrid";

export { AgGrid };
export type { AgGridProps };
