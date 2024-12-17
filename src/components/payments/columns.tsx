"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PaymentActions } from "./actions";

// Интерфейс данных для таблицы
export type Payment = {
    id: number;
    contract_id: number; // contract_id
    amount: number;
    created_at: string; // created_at
    payment_type?: string; // payment_type
    currency?: string; // currency
  };


// Мэппинг данных для согласования API с интерфейсом Payment
const mapPayment = (payment: any): Payment => ({
    id: payment.id,
    contract_id: payment.contract_id,  // Используем contract_id
    amount: Number(payment.amount), // Преобразуем Decimal в число
    created_at: payment.created_at?.toISOString() || "", // Преобразуем в ISO строку
    payment_type: payment.payment_type,  // Используем payment_type
    currency: payment.currency || "USD", // Устанавливаем валюту, если она есть
  });


// Определение колонок таблицы
export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "Payment ID",
    },
    {
      accessorKey: "contract_id",
      header: "Contract ID",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.original.currency || "USD",
        }).format(amount);
        return formatted;
      },
    },
    {
      accessorKey: "created_at",
      header: "Payment Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return date.toLocaleDateString();
      },
    },

    {
      accessorKey: "payment_type",
      header: "Payment Type",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      id: "actions",
      cell: ({ row }) => <PaymentActions payment={row.original} />,
    },
  ];

