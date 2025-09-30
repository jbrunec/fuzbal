import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Match } from "@/types";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./match-columns";

export function MatchesTable({ data }: { data: Match[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "_creationTime", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
  });
  console.log(data);
  console.log(table.getFilteredRowModel().rows);
  return (
    <>
      <Input
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search by player..."
      />
      <div className="rounded-md border border-gray-800 bg-gray-900">
        <Table className="sm:min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-gray-800 hover:bg-gray-800/50"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-300 font-medium text-xs sm:text-sm sm:px-3 sm:py-2"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-800 hover:bg-gray-800/30 text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-gray-100 px-1 py-1 text-xs sm:text-sm sm:px-4 sm:py-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-400"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {table.getCanPreviousPage() && (
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className="border"
              />
            )}
          </PaginationItem>
          <PaginationItem>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </PaginationItem>
          <PaginationItem>
            {table.getCanNextPage() && (
              <PaginationNext
                onClick={() => table.nextPage()}
                className="border"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div>Games: {table.getRowCount()}</div>
    </>
  );
}
