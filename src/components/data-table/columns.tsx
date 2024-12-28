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
    oil_last_change?: Date; // Дата последней замены масла (опционально)
    ode?: number; // Пробег (опционально)
    is_available: boolean; // Наличие машины
  };


export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
    header: "id",
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
    accessorKey: "car_number",
    header: "Number",
  },
  {
    accessorKey: "color",
    header: "Color",
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
    id: "actions",
    cell: ({ row }) => <CarActions car={row.original} />,
  },
];
