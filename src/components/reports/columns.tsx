import { ColumnDef } from "@tanstack/react-table";
import { AdminName } from "./admin-name";

export type Payment = {
  id: number;
  contract_id: number;
  amount: number;
  created_at: string;
  payment_type?: string;
  currency?: string;
  manager_id?: number;
  manager_name?: string;
  status: string;
};

const mapPayment = (payment: any): Payment => ({
  id: payment.id,
  contract_id: payment.contract_id,
  amount: Number(payment.amount),
  created_at: payment.created_at?.toISOString() || "",
  payment_type: payment.payment_type,
  currency: payment.currency || "THB",
  manager_id: payment.manager_id,
  manager_name: payment.manager?.name,
  status: "NOT_ACCEPTED",
});

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
      return amount.toLocaleString(); // Это просто отформатирует число без валюты
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
    accessorKey: "manager_id",
    header: "manager_id",
  },

  {
    accessorKey: "manager_name",
    header: "Admin Name",
    cell: ({ row }) => <AdminName managerId={row.getValue("manager_id") as number} />,
  },
  {
    accessorKey: "status",
    header: "status",
  },
];
