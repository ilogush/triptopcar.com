import { ColumnDef } from "@tanstack/react-table";
import { PaymentActions } from "./actions";
import { AdminName } from "./admin-name";

export type PaymentsStatus = "NOT_ACCEPTED" | "ACCEPTED";
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
      const currency = row.original.currency || "THB";
      return `${currency} ${amount.toLocaleString()}`;
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
    cell: ({ row }) => {
      const status = row.getValue("status") as PaymentsStatus;

      const toggleStatus = () => {
        console.log("click");
      };

      const statusColors: Record<PaymentsStatus, string> = {
        ACCEPTED: "bg-green-100 text-green-800",
        NOT_ACCEPTED: "bg-red-100 text-red-800",
      };

      return (
        <span
          onClick={toggleStatus}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <PaymentActions payment={row.original} />,
  },
];
