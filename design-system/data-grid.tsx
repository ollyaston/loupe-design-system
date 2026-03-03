"use client";

import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridOptions,
  themeQuartz,
  RowClickedEvent,
  GridReadyEvent,
  ModuleRegistry,
  IDetailCellRendererParams,
  TooltipModule,
} from "ag-grid-community";
import { SparklinesModule, MasterDetailModule } from "ag-grid-enterprise";
import {
  AgChartsCommunityModule,
  AgSparklineOptions,
} from "ag-charts-community";
import { Badge } from "./badge";
import { Button } from "./button";

import "@/styles/ag-grid.css";

// Register modules
ModuleRegistry.registerModules([
  TooltipModule,
  SparklinesModule.with(AgChartsCommunityModule),
  MasterDetailModule,
]);

// ============================================================================
// CELL RENDERERS - Built-in renderers matching design system
// ============================================================================

/** Default text cell - matches CellWrapper styling */
const DefaultCellRenderer = ({
  value,
  valueFormatted,
}: {
  value: any;
  valueFormatted?: string | null;
}) => {
  // Use valueFormatted if available (from valueFormatter), otherwise use raw value
  const displayValue = valueFormatted ?? value ?? "—";
  return (
    <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
      <span className="truncate whitespace-nowrap">{displayValue}</span>
    </div>
  );
};

/** Monospace text cell - for IDs, codes, numerical values */
const MonospaceCellRenderer = ({
  value,
  valueFormatted,
}: {
  value: any;
  valueFormatted?: string | null;
}) => {
  const displayValue = valueFormatted ?? value ?? "—";
  return (
    <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
      <span className="truncate whitespace-nowrap font-mono text-xs">
        {displayValue}
      </span>
    </div>
  );
};

/** Link cell - clickable text that looks like a link */
const LinkCellRenderer = ({
  value,
  data,
  colDef,
}: {
  value: any;
  data: any;
  colDef: any;
}) => {
  const displayValue = value ?? "—";
  const href = colDef.cellRendererParams?.getHref?.(data);

  if (href) {
    return (
      <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
        <a
          href={href}
          onClick={(e) => e.stopPropagation()}
          className="hover:underline cursor-pointer truncate whitespace-nowrap"
        >
          {displayValue}
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
      <span className="hover:underline cursor-pointer truncate whitespace-nowrap">
        {displayValue}
      </span>
    </div>
  );
};

/** Badge/Status cell - displays a badge with configurable variants */
const BadgeCellRenderer = ({
  value,
  data,
  colDef,
}: {
  value: any;
  data: any;
  colDef: any;
}) => {
  const getBadgeConfig = colDef.cellRendererParams?.getBadgeConfig;

  if (!value && !getBadgeConfig) {
    return <span>—</span>;
  }

  if (getBadgeConfig) {
    // Pass both value and data so config can be based on full row context
    const config = getBadgeConfig(value, data);
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  }

  return <Badge variant="secondary">{value}</Badge>;
};

/** Button/Action cell - renders a button with click handler */
const ButtonCellRenderer = ({
  data,
  colDef,
  context,
}: {
  data: any;
  colDef: any;
  context: any;
}) => {
  const params = colDef.cellRendererParams;
  const shouldShow = params?.shouldShow?.(data) ?? true;
  const isLoading = params?.isLoading?.(data, context) ?? false;
  const label =
    typeof params?.label === "function"
      ? params.label(data, isLoading)
      : (params?.label ?? "Action");
  const onClick = params?.onClick;

  if (!shouldShow) {
    return null;
  }

  return (
    <Button
      size="sm"
      variant={params?.variant ?? "outline"}
      disabled={isLoading}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(data, context);
      }}
    >
      {label}
    </Button>
  );
};

/** Date cell - renders dates with monospace font */
const DateCellRenderer = ({
  value,
  valueFormatted,
}: {
  value: any;
  valueFormatted?: string | null;
}) => {
  // Use valueFormatted if available (from valueFormatter), otherwise format the date
  let displayValue = valueFormatted;

  if (!displayValue && value) {
    const date = new Date(value);
    if (!isNaN(date.getTime()) && date.getFullYear() >= 2020) {
      displayValue = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  if (!displayValue) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
      <span className="truncate whitespace-nowrap font-mono text-xs">
        {displayValue}
      </span>
    </div>
  );
};

/** Sparkline empty state cell - shown when no sparkline data */
const SparklineEmptyCellRenderer = () => {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      —
    </div>
  );
};

// Map of built-in cell renderer types
const CELL_RENDERERS = {
  default: DefaultCellRenderer,
  text: DefaultCellRenderer,
  monospace: MonospaceCellRenderer,
  date: DateCellRenderer,
  link: LinkCellRenderer,
  badge: BadgeCellRenderer,
  button: ButtonCellRenderer,
  sparkline: SparklineEmptyCellRenderer, // Only used for empty state
} as const;

type CellRendererType = keyof typeof CELL_RENDERERS;

// ============================================================================
// COLUMN DEFINITION TYPES
// ============================================================================

export interface DataGridColumn<TData = any> {
  /** Field name from the data object */
  field?: string;
  /** Header text */
  headerName: string;
  /** Built-in cell renderer type or custom renderer */
  type?: CellRendererType;
  /** Filter type: "text" (default), "number", or false to disable */
  filterType?: "text" | "number" | false;
  /** Custom cell renderer component */
  cellRenderer?: React.ComponentType<any>;
  /** Parameters passed to cell renderer */
  cellRendererParams?: {
    /** For link type: function to get href from row data */
    getHref?: (data: TData) => string | undefined;
    /** For badge type: function to get badge config from value and row data */
    getBadgeConfig?: (
      value: any,
      data: TData,
    ) => {
      label: string;
      variant?: "default" | "secondary" | "destructive" | "outline";
      className?: string;
    };
    /** For button type: whether to show the button */
    shouldShow?: (data: TData) => boolean;
    /** For button type: whether button is in loading state */
    isLoading?: (data: TData, context: any) => boolean;
    /** For button type: button label (can be function) */
    label?: string | ((data: TData, isLoading: boolean) => string);
    /** For button type: button variant */
    variant?: "default" | "outline" | "ghost" | "destructive";
    /** For button type: click handler */
    onClick?: (data: TData, context: any) => void;
    /** For sparkline type: line color */
    color?: string;
    /** For sparkline type: chart height in pixels */
    height?: number;
    /** For sparkline type: whether to show gradient shading */
    shading?: boolean;
    /** For sparkline type: function to extract data array from value */
    getData?: (value: any) => number[];
    /** Any additional params */
    [key: string]: any;
  };
  /** Fixed width in pixels */
  width?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  /** Flex grow factor */
  flex?: number;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Value formatter function */
  valueFormatter?: (params: { value: any; data: TData }) => string;
  /** Value getter function */
  valueGetter?: (params: { data: TData }) => any;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface DataGridProps<TData = any> {
  /** Row data array */
  rowData: TData[];
  /** Column definitions */
  columns: DataGridColumn<TData>[];
  /** Height of the grid (default: 600). Use "auto" for auto-height based on content. */
  height?: number | string;
  /** Maximum height when using auto height (optional) */
  maxHeight?: number | string;
  /** Enable pagination (default: true) */
  pagination?: boolean;
  /** Page size (default: 25) */
  pageSize?: number;
  /** Page size options for selector */
  pageSizeOptions?: number[];
  /** Row click handler */
  onRowClick?: (data: TData) => void;
  /** Grid ready callback */
  onGridReady?: (event: GridReadyEvent) => void;
  /** Get unique row ID */
  getRowId?: (data: TData) => string;
  /** Context object passed to cell renderers */
  context?: any;
  /** Additional grid options */
  gridOptions?: Partial<GridOptions>;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Enable master-detail for expandable rows */
  masterDetail?: boolean;
  /** Custom detail cell renderer component for master-detail */
  detailCellRenderer?: React.ComponentType<IDetailCellRendererParams<TData>>;
  /** Height of detail rows in pixels (default: 300) */
  detailRowHeight?: number;
  /** Auto height for detail rows based on content */
  detailRowAutoHeight?: boolean;
}

function DataGrid<TData = any>({
  rowData,
  columns,
  height = 600,
  maxHeight,
  pagination = true,
  pageSize = 25,
  pageSizeOptions = [25, 50, 100],
  onRowClick,
  onGridReady,
  getRowId,
  context,
  gridOptions = {},
  loading = false,
  emptyMessage = "No data to display",
  masterDetail = false,
  detailCellRenderer,
  detailRowHeight = 300,
  detailRowAutoHeight = false,
}: DataGridProps<TData>) {
  // Convert our column definitions to AG Grid column definitions
  const columnDefs: ColDef<TData>[] = React.useMemo(() => {
    return columns.map((col) => {
      // Determine filter type
      let filter: string | boolean = "agTextColumnFilter";
      if (col.filterType === "number") {
        filter = "agNumberColumnFilter";
      } else if (col.filterType === false) {
        filter = false;
      }

      const agColDef: ColDef<TData> = {
        field: col.field as any,
        headerName: col.headerName,
        width: col.width,
        minWidth: col.minWidth,
        flex: col.flex,
        sortable: col.sortable ?? true,
        filter,
        valueFormatter: col.valueFormatter as any,
        valueGetter: col.valueGetter as any,
        cellRendererParams: col.cellRendererParams,
        // Skip tooltips entirely to avoid "[Object object]" popups with complex data
        tooltipField: undefined,
      };

      // Set cell renderer based on type or custom renderer
      if (col.cellRenderer) {
        agColDef.cellRenderer = col.cellRenderer;
      } else if (col.type === "sparkline") {
        // Use AG Grid's built-in sparkline cell renderer
        agColDef.cellRenderer = "agSparklineCellRenderer";
        agColDef.cellRendererParams = {
          sparklineOptions: {
            type: "line",
            stroke: col.cellRendererParams?.color ?? "#000000",
            strokeWidth: 2,
            padding: {
              top: 8,
              bottom: 8,
              left: 4,
              right: 4,
            },
            marker: {
              enabled: false,
            },
          } as AgSparklineOptions,
          ...col.cellRendererParams,
        };
      } else if (col.type === "date") {
        agColDef.cellRenderer = DateCellRenderer;
        // Also add valueFormatter as backup for date formatting
        if (!col.valueFormatter) {
          agColDef.valueFormatter = (params: { value: any }) => {
            if (!params.value) return "";
            const date = new Date(params.value);
            if (!isNaN(date.getTime()) && date.getFullYear() >= 2020) {
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            }
            return "";
          };
        }
      } else if (col.type === "link") {
        agColDef.cellRenderer = LinkCellRenderer;
      } else if (col.type === "badge") {
        agColDef.cellRenderer = BadgeCellRenderer;
      } else if (col.type === "button") {
        agColDef.cellRenderer = ButtonCellRenderer;
      } else if (col.type === "monospace") {
        agColDef.cellRenderer = MonospaceCellRenderer;
      } else {
        agColDef.cellRenderer = DefaultCellRenderer;
      }

      // Disable sorting for button and sparkline columns by default
      if (col.type === "button" || col.type === "sparkline") {
        agColDef.sortable = col.sortable ?? false;
      }

      return agColDef;
    });
  }, [columns]);

  // Handle row click - merges with any onRowClicked passed in gridOptions
  const handleRowClicked = React.useCallback(
    (event: RowClickedEvent<TData>) => {
      // Skip row click if the click originated from an interactive element (button, link, input)
      const target = event.event?.target as HTMLElement;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("input")
      ) {
        return;
      }

      // Call the gridOptions onRowClicked first if provided
      gridOptions?.onRowClicked?.(event);
      // Then call our onRowClick prop
      if (onRowClick && event.data) {
        onRowClick(event.data);
      }
    },
    [onRowClick, gridOptions],
  );

  // Grid options
  const isAutoHeight = height === "auto";
  const defaultGridOptions: GridOptions<TData> = {
    ...gridOptions,
    theme: themeQuartz,
    context,
    pagination,
    paginationPageSize: pageSize,
    paginationPageSizeSelector: pageSizeOptions,
    rowSelection: "single",
    suppressRowClickSelection: false,
    animateRows: true,
    tooltipShowDelay: 300,
    tooltipShowMode: "whenTruncated",
    getRowId: getRowId ? (params) => getRowId(params.data!) : undefined,
    onRowClicked: handleRowClicked,
    onGridReady,
    overlayLoadingTemplate:
      '<span class="ag-overlay-loading-center">Loading...</span>',
    overlayNoRowsTemplate: `<span class="ag-overlay-no-rows-center">${emptyMessage}</span>`,
    domLayout: isAutoHeight ? "autoHeight" : "normal",
    // Master-detail configuration
    masterDetail,
    detailCellRenderer,
    detailRowHeight: detailRowAutoHeight ? undefined : detailRowHeight,
    detailRowAutoHeight,
    // All rows are master rows when masterDetail is enabled
    isRowMaster: masterDetail ? () => true : undefined,
  };

  const gridStyle: React.CSSProperties = {
    height: isAutoHeight
      ? "auto"
      : typeof height === "number"
        ? `${height}px`
        : height,
    width: "100%",
    ...(isAutoHeight && maxHeight
      ? {
          maxHeight:
            typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflow: "auto",
        }
      : {}),
  };

  // Handle empty state explicitly for autoHeight mode
  const isEmpty = !rowData || rowData.length === 0;
  if (isAutoHeight && isEmpty && !loading) {
    return (
      <div className="loupe-system w-full border border-border rounded-md">
        <div className="flex items-center justify-center py-12">
          <span className="text-sm text-muted-foreground">{emptyMessage}</span>
        </div>
      </div>
    );
  }

  // Only show loading overlay when there's no data yet (initial load).
  // When we have data and are updating (e.g., sorting, pagination), keep showing
  // the existing data instead of a loading skeleton.
  const showLoadingOverlay = loading && isEmpty;

  return (
    <div className="loupe-system w-full overflow-hidden" style={gridStyle}>
      <AgGridReact<TData>
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={defaultGridOptions}
        loading={showLoadingOverlay}
      />
    </div>
  );
}

DataGrid.displayName = "DataGrid";

// ============================================================================
// EXPORTS
// ============================================================================

export { DataGrid };

// Export cell renderers for custom use
export {
  DefaultCellRenderer,
  MonospaceCellRenderer,
  DateCellRenderer,
  LinkCellRenderer,
  BadgeCellRenderer,
  ButtonCellRenderer,
  SparklineEmptyCellRenderer,
};

// Export types for master-detail
export type { IDetailCellRendererParams };
