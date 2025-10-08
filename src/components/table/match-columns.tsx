import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Match } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "blueDefender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Blue D.
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "blueAttacker",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Blue A.
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "blueScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Blue Score
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            {
              "bg-blue-700":
                row.getValue<number>("blueScore") >
                row.getValue<number>("redScore"),
            },
            "text-center"
          )}
        >
          {row.getValue("blueScore")}
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "redScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Red Score
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            {
              "bg-red-800":
                row.getValue<number>("blueScore") <
                row.getValue<number>("redScore"),
            },
            "text-center"
          )}
        >
          {row.getValue("redScore")}
        </div>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "redAttacker",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Red A.
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "redDefender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Red D.
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "_creationTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Date
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.getValue("_creationTime")).toLocaleDateString()}
        </div>
      );
    },
  },
];
