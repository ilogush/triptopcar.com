"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HotelsActions } from "./actions";

// Обновляем тип Hotels
export type Hotels = {
  id: number;
  name: string;
};

export const columns: ColumnDef<Hotels>[] = [
  {
    accessorKey: "id",
    header: "Hotel ID",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    id: "actions",
    cell: ({ row }) => <HotelsActions hotels={row.original} />,
  },
];
