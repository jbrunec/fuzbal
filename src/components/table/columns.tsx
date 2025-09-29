import { Button } from "@/components/ui/button";
import { Player } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Name
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "games",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Games
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "wins",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Wins
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "winPercentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-0 py-0 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Win %
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percentage = Number.parseFloat(row.getValue("winPercentage"));
      return <div className="text-center">{percentage}%</div>;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-accent text-gray-300 hover:text-white px-1 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 h-auto"
        >
          Rating
          <ArrowUpDown className="hidden sm:block sm:ml-2 sm:h-4 sm:w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = Number.parseFloat(row.getValue("rating")).toPrecision(4);
      return <div className="text-center">{rating}</div>;
    },
  },
];
