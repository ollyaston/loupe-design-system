import { DataTable, DataTableColumnHeader } from "@/design-system/data-table";
import { Skeleton } from "@/design-system/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/table";

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-32" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-56" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-56" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-56" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-56" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-56" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function DataTableSkeleton() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "col1",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: () => <Skeleton className="h-4 w-24" />,
    },
    {
      accessorKey: "col2",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: () => <Skeleton className="h-4 w-24" />,
    },
    {
      accessorKey: "col3",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: () => <Skeleton className="h-4 w-24" />,
    },
    {
      accessorKey: "col4",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: () => <Skeleton className="h-4 w-24" />,
    },
    {
      accessorKey: "col5",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: () => <Skeleton className="h-4 w-24" />,
    },
  ];

  const skeletonData = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    col1: "",
    col2: "",
    col3: "",
    col4: "",
    col5: "",
  }));

  return <DataTable columns={columns} data={skeletonData} />;
}
