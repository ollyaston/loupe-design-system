"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ExpandedState,
  getExpandedRowModel,
  RowSelectionState,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { GemId } from "@/design-system/gem";
import { Icon } from "@/design-system/icon";
import { Checkbox } from "@/design-system/checkbox";
import { Search } from "@/design-system/search";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/table";
import { Pagination } from "@/design-system/pagination";

// ----------------------------- Column Header -----------------------------

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: any;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (!column.getCanSort()) {
    return <div className={cn("whitespace-nowrap", className)}>{title}</div>;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 cursor-pointer select-none h-full",
        className,
      )}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={cn(
          "whitespace-nowrap",
          column.getIsSorted() && "text-foreground font-medium",
        )}
      >
        {title}
      </span>
      <div className="w-4 h-4 flex items-center justify-center">
        {column.getIsSorted() ? (
          <Icon
            name="arrow_downward"
            size={16}
            className={cn(column.getIsSorted() === "asc" && "rotate-180")}
          />
        ) : (
          <Icon
            name="expand_all"
            size={12}
            className={cn(
              "transition-opacity duration-150",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </div>
    </div>
  );
}

DataTableColumnHeader.displayName = "DataTableColumnHeader";

// ----------------------------- Rows -----------------------------

const DataTableRow = ({
  className,
  header,
  onClick,
  children,
}: {
  className?: string;
  header?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <TableRow
    className={cn(
      "loupe-system",
      header
        ? "text-muted-foreground"
        : "transition-colors data-[state=selected]:bg-muted",
      onClick ? "hover:bg-muted/50" : "",
      className,
    )}
    onClick={onClick}
  >
    {children}
  </TableRow>
);
DataTableRow.displayName = "DataTableRow";

// ----------------------------- Cell Wrapper -----------------------------

interface CellWrapperProps {
  className?: string;
  gem?: GemId;
  monospace?: boolean;
  wrapText?: boolean;
  maxWidth?: number;
  href?: string;
  target?: string;
  children: React.ReactNode;
}

const CellWrapper = ({
  className,
  gem,
  monospace,
  wrapText,
  maxWidth,
  href,
  target,
  children,
}: CellWrapperProps) => (
  <div
    className="flex items-center gap-1 overflow-hidden text-ellipsis"
    style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
  >
    {/* Hide all gems */}
    {/* {gem && <Gem id={gem} size={20} />} */}
    {href ? (
      <a
        onClick={(e) => e.stopPropagation()}
        href={href}
        target={target}
        className={cn(
          "hover:underline cursor-pointer truncate",
          className,
          monospace ? "font-mono" : "",
          wrapText ? "whitespace-normal" : "whitespace-nowrap",
        )}
      >
        {children}
      </a>
    ) : (
      <div
        className={cn(
          "truncate",
          className,
          monospace ? "font-mono" : "",
          wrapText ? "whitespace-normal" : "whitespace-nowrap",
        )}
      >
        {children}
      </div>
    )}
  </div>
);
CellWrapper.displayName = "CellWrapper";

// ----------------------------- Cells -----------------------------

const DataTableCell = ({
  className,
  gem,
  monospace,
  wrapText,
  maxWidth,
  href,
  target,
  children,
  colSpan,
  isFirstColumn,
  bordered,
}: {
  className?: string;
  gem?: GemId;
  monospace?: boolean;
  wrapText?: boolean;
  maxWidth?: number;
  href?: string;
  target?: string;
  children: React.ReactNode;
  colSpan?: number;
  isFirstColumn?: boolean;
  bordered?: boolean;
}) => (
  <TableCell
    className={cn(
      "loupe-system",
      "p-3 whitespace-nowrap",
      isFirstColumn && bordered && "pl-4",
      className,
    )}
    colSpan={colSpan}
  >
    <CellWrapper
      gem={gem}
      monospace={monospace}
      wrapText={wrapText}
      maxWidth={maxWidth}
      href={href}
      target={target}
    >
      {children}
    </CellWrapper>
  </TableCell>
);
DataTableCell.displayName = "DataTableCell";

// ----------------------------- Expand Button -----------------------------

interface ExpandButtonProps {
  expanded: boolean;
  onToggle: () => void;
}

const ExpandButton = ({ expanded, onToggle }: ExpandButtonProps) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className="flex items-center justify-center w-6 h-6 rounded-sm hover:bg-muted transition-colors select-none"
  >
    <Icon
      name="chevron_right"
      size={16}
      className={cn(
        "transition-transform duration-200",
        expanded && "rotate-90",
      )}
    />
  </button>
);

ExpandButton.displayName = "ExpandButton";

// ----------------------------- Selection Column -----------------------------

const createSelectionColumn = <TData,>(): ColumnDef<TData> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
  size: 40,
  minSize: 40,
  maxSize: 40,
});

// ----------------------------- Wrappers -----------------------------

// These components don't have any differences from the base table components
// (not yet at least)

const DataTableWrapper = Table;
DataTableWrapper.displayName = "DataTableWrapper";

const DataTableHeader = TableHeader;
DataTableHeader.displayName = "DataTableHeader";

const DataTableBody = TableBody;
DataTableBody.displayName = "DataTableBody";

const DataTableFooter = TableFooter;
DataTableFooter.displayName = "DataTableFooter";

const DataTableHead = ({
  className,
  children,
  isFirstColumn,
  bordered,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  isFirstColumn?: boolean;
  bordered?: boolean;
} & React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <TableHead
    className={cn(
      "loupe-system",
      isFirstColumn && bordered && "pl-4",
      className,
    )}
    {...props}
  >
    {children}
  </TableHead>
);
DataTableHead.displayName = "DataTableHead";

// ----------------------------- Entire Table API -----------------------------

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  columnWidths?: Record<string, string>;
  cellMaxWidth?: number;
  cellClassName?: string;
  defaultSorting?: SortingState;
  getRowCanExpand?: (row: any) => boolean;
  getSubRows?: (row: TData) => TData[];
  defaultExpanded?: boolean;
  /** Controlled expanded state - use with onExpandedChange for controlled mode */
  expanded?: ExpandedState;
  /** Callback when expanded state changes - use with expanded prop for controlled mode */
  onExpandedChange?: (expanded: ExpandedState) => void;
  getRowClassName?: (row: TData) => string;
  bordered?: boolean;
  onRowToggleExpand?: (rowOriginal: TData, nextExpanded: boolean) => void;
  renderExpandedContent?: (rowOriginal: TData) => React.ReactNode;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  getRowId?: (row: TData) => string;
  showSearch?: boolean;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  filterContent?: React.ReactNode;
  primaryActionContent?: React.ReactNode;
  itemCountContent?: string;
  title?: string;
  enablePagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  columnWidths,
  cellMaxWidth,
  cellClassName,
  defaultSorting,
  getRowCanExpand,
  getSubRows,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  getRowClassName,
  bordered = false,
  onRowToggleExpand,
  renderExpandedContent,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  showSearch = false,
  onSearchChange,
  searchPlaceholder = "Search...",
  searchValue,
  filterContent,
  primaryActionContent,
  itemCountContent,
  title,
  enablePagination = false,
  pageSize = 10,
  currentPage,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(
    defaultSorting || [],
  );
  const [internalExpanded, setInternalExpanded] = React.useState<ExpandedState>(
    {},
  );
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({});
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });

  // Use controlled or internal expanded state
  const expanded = controlledExpanded ?? internalExpanded;
  const setExpanded = onExpandedChange ?? setInternalExpanded;

  const tableColumns = React.useMemo(() => {
    if (enableRowSelection) {
      return [createSelectionColumn<TData>(), ...columns];
    }
    return columns;
  }, [enableRowSelection, columns]);

  const paginationState = React.useMemo(() => {
    if (currentPage !== undefined) {
      return {
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      };
    }
    return internalPagination;
  }, [currentPage, pageSize, internalPagination]);

  const tableConfig: any = {
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    onExpandedChange: (updater: any) => {
      const newExpanded =
        typeof updater === "function" ? updater(expanded) : updater;
      setExpanded(newExpanded);
    },
    onRowSelectionChange: (updater: any) => {
      const newSelection =
        typeof updater === "function"
          ? updater(rowSelection || internalRowSelection)
          : updater;
      if (onRowSelectionChange) {
        onRowSelectionChange(newSelection);
      } else {
        setInternalRowSelection(newSelection);
      }
    },
    getRowCanExpand: getRowCanExpand,
    getSubRows: getSubRows,
    getRowId: getRowId,
    enableRowSelection: enableRowSelection,
    state: {
      sorting,
      expanded,
      rowSelection: rowSelection || internalRowSelection,
    },
  };

  if (enablePagination) {
    tableConfig.getPaginationRowModel = getPaginationRowModel();
    tableConfig.onPaginationChange = (updater: any) => {
      const newPagination =
        typeof updater === "function" ? updater(paginationState) : updater;
      if (onPageChange) {
        onPageChange(newPagination.pageIndex + 1);
      } else {
        setInternalPagination(newPagination);
      }
    };
    tableConfig.state.pagination = paginationState;
  }

  const table = useReactTable(tableConfig);

  const handleRowClick = (row: any) => {
    if (row.getCanExpand()) {
      const next = !row.getIsExpanded();
      row.toggleExpanded();
      onRowToggleExpand?.(row.original, next);
    } else if (onRowClick) {
      onRowClick(row.original);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter content, search, and primary action */}
      {(filterContent ||
        showSearch ||
        primaryActionContent ||
        itemCountContent ||
        title) && (
        <div className="flex items-center gap-4">
          {title && (
            <div className="text-base font-semibold text-foreground">
              {title}
            </div>
          )}
          {filterContent && (
            <div className="flex items-center">{filterContent}</div>
          )}
          <div className="flex items-center gap-4 ml-auto">
            {itemCountContent && (
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {itemCountContent}
              </div>
            )}
            {showSearch && (
              <Search
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
                className="w-full max-w-md"
              />
            )}
            {primaryActionContent && (
              <div className="flex items-center">{primaryActionContent}</div>
            )}
          </div>
        </div>
      )}
      {/* Wrapper div for border styling and horizontal scrolling */}
      <div
        className={cn(
          bordered && "border border-border rounded-md overflow-hidden",
        )}
      >
        {/* Horizontal scroll container */}
        <div className="overflow-x-auto">
          <DataTableWrapper overflowScroll={false}>
            <DataTableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <DataTableRow key={headerGroup.id} header>
                  {headerGroup.headers.map((header, headerIndex) => {
                    const columnId = header.column.id;
                    const width = columnWidths?.[columnId];
                    const isSelectionColumn = header.column.id === "select";
                    return (
                      <DataTableHead
                        key={header.id}
                        className={cn(
                          width,
                          isSelectionColumn && "w-8 max-w-8 px-3",
                        )}
                        isFirstColumn={headerIndex === 0}
                        bordered={bordered}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </DataTableHead>
                    );
                  })}
                </DataTableRow>
              ))}
            </DataTableHeader>
            <DataTableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const isExpanded = row.getIsExpanded();
                  const canExpand = row.getCanExpand();
                  const isClickable = canExpand || onRowClick;
                  const isSubRow = row.depth > 0;

                  return (
                    <React.Fragment key={row.id}>
                      <DataTableRow
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() => handleRowClick(row)}
                        className={cn(
                          isClickable ? "hover:bg-muted/50 cursor-pointer" : "",
                          isExpanded && "bg-muted/30",
                          isSubRow && "bg-muted/10",
                          isSubRow && row.depth === 1 && "bg-muted/10",
                          isSubRow && row.depth === 2 && "bg-muted/5",
                          isSubRow && row.depth >= 3 && "bg-muted/2",
                          getRowClassName?.(row.original as TData),
                        )}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => {
                          const columnId = cell.column.id;
                          const width = columnWidths?.[columnId];
                          const isSelectionColumn = cell.column.id === "select";
                          const isFirstDataColumn =
                            cellIndex === (enableRowSelection ? 1 : 0);

                          // Render cell content based on column type
                          const renderCellContent = () => {
                            if (isSelectionColumn) {
                              return flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              );
                            }

                            if (isFirstDataColumn && canExpand) {
                              return (
                                <div
                                  className="flex items-center gap-2"
                                  style={{ paddingLeft: `${row.depth * 24}px` }}
                                >
                                  <ExpandButton
                                    expanded={isExpanded}
                                    onToggle={() => {
                                      const next = !row.getIsExpanded();
                                      row.toggleExpanded();
                                      onRowToggleExpand?.(
                                        row.original as TData,
                                        next,
                                      );
                                    }}
                                  />
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </div>
                              );
                            }

                            if (isFirstDataColumn && !canExpand && isSubRow) {
                              return (
                                <div
                                  className="flex items-center gap-2"
                                  style={{ paddingLeft: `${row.depth * 24}px` }}
                                >
                                  <div className="w-6 h-6" />
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </div>
                              );
                            }

                            return flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            );
                          };

                          // Get column-specific cell props from meta
                          const columnMeta = cell.column.columnDef.meta as any;
                          const cellProps = columnMeta?.cellProps || {};

                          return (
                            <DataTableCell
                              key={cell.id}
                              className={cn(
                                width,
                                isSelectionColumn && "w-8 max-w-8 px-3",
                                cellClassName,
                              )}
                              maxWidth={cellMaxWidth}
                              isFirstColumn={cellIndex === 0}
                              bordered={bordered}
                              {...cellProps}
                            >
                              {renderCellContent()}
                            </DataTableCell>
                          );
                        })}
                      </DataTableRow>
                      {row.getIsExpanded() && renderExpandedContent && (
                        <DataTableRow>
                          <DataTableCell
                            colSpan={tableColumns.length}
                            isFirstColumn={true}
                            bordered={bordered}
                            className="pt-0"
                          >
                            {renderExpandedContent(row.original as TData)}
                          </DataTableCell>
                        </DataTableRow>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <DataTableRow>
                  <DataTableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                    isFirstColumn={true}
                    bordered={bordered}
                  >
                    No results.
                  </DataTableCell>
                </DataTableRow>
              )}
            </DataTableBody>
          </DataTableWrapper>
        </div>
      </div>
      {enablePagination && table.getPageCount() > 1 && (
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      )}
    </div>
  );
}

// ----------------------------- Exports -----------------------------

export {
  DataTableRow,
  DataTableCell,
  DataTableWrapper,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
  DataTableHead,
  CellWrapper,
  DataTableColumnHeader,
};
