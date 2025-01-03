"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ClientActions } from "./actions";
import { format } from "date-fns";

export type Client = {
  id: number;
  first_name: string;
  last_name: string;
  phone_1: string;
  phone_2?: string;
  passport_number?: string;
  status: string;
  location_id?: number;
  created_at: Date;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 50,
  },
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
  {
    accessorKey: "phone_1",
    header: "Phone",
  },
  {
    accessorKey: "passport_number",
    header: "Passport",
  },
  {
    accessorKey: "location_id",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors: Record<string, string> = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-red-100 text-red-800",
        // Добавьте другие статусы по необходимости
      };
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
