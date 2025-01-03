"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CarActions } from "./actions";
export type Car = {
  id: number;
  image_url: string;
  car_body_type: string;
  price_per_day: number;
  engine_capacity?: string;
  fuel_type: string;
  seats_quantity: number;
  deposit: number;
  year: string;
  transmission_type: string;
  brand: string;
  model: string;
  car_number: string;
  color: string;
  oil_last_change?: number; // Дата последней замены масла (опционально)
  ode?: number; // Пробег (опционально)
  is_available: boolean; // Наличие машины
};

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "car_number",
    header: "Number",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "car_body_type",
    header: "Body Type",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "price_per_day",
    header: "Daily Rate",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price_per_day"));
      const formatted = new Intl.NumberFormat("th-TH", {
        // Изменено на тайскую локаль
        style: "currency",
        currency: "THB", // Установлено на тайские баты (THB)
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "ode",
    header: "Mileage ode",
  },
  {
    accessorKey: "oil_last_change",
    header: "Change oil",
    cell: ({ row }) => {
      const ode = row.getValue("ode") as number;
      const oil_last_change = row.getValue("oil_last_change") as number;
      const difference = oil_last_change - ode;
      const backgroundColor = difference > 500 ? "bg-red-500" : "";
      return <div className={backgroundColor}>{oil_last_change}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CarActions car={row.original} />,
  },
];
