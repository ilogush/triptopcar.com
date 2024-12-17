"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationActions } from "../locations/actions";
// Обновляем тип Location
export type Location = {
    id: number;
    deliveryprice: number;
    name: string;
  };

  export const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "id",
      header: "Location ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
    },
    {
      accessorKey: "name", // Обновляем для использования google_maps_link
      header: "Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "deliveryprice", // Обновляем для использования hotel_name
      header: "delivery Price",
      cell: ({ row }) => row.getValue("deliveryprice"),
    },
    {
      id: "actions",
      cell: ({ row }) => <LocationActions location={row.original} />,
    },
  ];
