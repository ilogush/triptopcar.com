"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ClientActions } from "./actions";

export type Client = {
  id: number;
  first_name: string; // Изменено на first_name
  last_name: string; // Изменено на last_name
  phone_1: string; // Изменено на phone_1
  phone_2?: string; // Изменено на phone_2, если это поле может быть необязательным
  passport_number?: string; // Добавлено, если нужно
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "first_name", // Используйте соответствующие поля из модели Prisma
    header: "First Name",
  },
  {
    accessorKey: "last_name", // Используйте соответствующие поля из модели Prisma
    header: "Last Name",
  },
  {
    accessorKey: "phone_1", // Используйте phone_1 из модели Prisma
    header: "Phone",
  },
  {
    accessorKey: "passport_number", // Используйте passport_number из модели Prisma, если нужно
    header: "Passport Number",
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
