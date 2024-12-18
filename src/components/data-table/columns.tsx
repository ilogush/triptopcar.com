"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CarActions } from "./actions";

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: string;
  car_body_type: string;
  fuel_type: string;
  price_per_day: number;
};

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "car_body_type",
    header: "Body Type",
  },
  {
    accessorKey: "fuel_type",
    header: "Fuel Type",
  },
  {
    accessorKey: "price_per_day",
    header: "Daily Rate",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price_per_day"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return formatted;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CarActions car={row.original} />,
  },
];
