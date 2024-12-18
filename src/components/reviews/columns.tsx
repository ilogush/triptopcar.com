"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReviewActions } from "./actions";

// Интерфейс данных для таблицы
export type Review = {
    id: number;
    car_id: number;
    name: string;
    review: string;
    rating: number | null;
    created_at: Date | null;  // Добавляем поле created_at
  };


// Мэппинг данных для согласования API с интерфейсом Review
const mapReview = (review: any): Review => ({
    id: review.id,
    car_id: review.car_id,
    name: review.name,
    review: review.review,
    rating: review.rating ?? null,
    created_at: review.created_at ?? null, // Обработка для created_at
  });


// Определение колонок таблицы
export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "id",
    header: "Review ID",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "car_id",
    header: "Car ID",
    cell: ({ row }) => row.getValue("car_id"),
  },
  {
    accessorKey: "name",
    header: "Reviewer Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "review",
    header: "Review",
    cell: ({ row }) => row.getValue("review"),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating");
      return rating !== null ? `${rating}/5` : "No rating";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ReviewActions review={row.original} />,
  },
];
