import { ColumnDef } from "@tanstack/react-table";
import { ContractActions } from "../contracts/actions";
import { format } from "date-fns";

// Определяем тип ContractStatus
export type ContractStatus = "PENDING" | "APPROVED" | "CANCELED";
export type Contract = {
  id: number;
  car_id: number | null;
  rental_amount: number;
  rental_currency: string;
  deposit_currency: string;
  pickup_location_id: number | null;
  amount: number;
  client_name: string;
  client_passport_number: string;
  client_phone_number: string;
  client_second_phone_number?: string;
  client_surname: string;
  date_end: Date;
  date_start: Date;
  dropoff_address: string;
  dropoff_location_id: number | null;
  full_insurance: boolean;
  manager: string;
  mileage_odo: number;
  rental_deposit_amount: number;
  rental_deposit_currency: string;
  time_return: Date | null;
  status: ContractStatus;
  client_id: number;
};

// Определение колонок таблицы
export const columns: ColumnDef<Contract>[] = [
  { accessorKey: "id", header: "ID", size: 50, cell: ({ row }) => `${row.getValue("id")}` },
  { accessorKey: "manager", header: "Creator", cell: ({ row }) => row.getValue("manager") },
  {
    accessorFn: (row) => `${row.client_name} ${row.client_surname}`,
    header: "Name",
    cell: (info) => info.getValue()
  },
  { accessorKey: "pickup_address", header: "Pickup Address", cell: ({ row }) => row.getValue("pickup_address") },
  { accessorKey: "dropoff_address", header: "Dropoff Address", cell: ({ row }) => row.getValue("dropoff_address") },
  {
    accessorKey: "rental_amount",
    header: "Rental Amount",
    cell: ({ row }) => `$${Number(row.getValue("rental_amount")).toFixed(2)}`,
  },
  {
    accessorKey: "rental_deposit_amount",
    header: "Rental Deposit",
    cell: ({ row }) => `$${Number(row.getValue("rental_deposit_amount")).toFixed(2)}`,
  },
  {
    accessorKey: "date_start",
    header: "Start Date",
    cell: ({ row }) => format(row.getValue("date_start"), "dd.MM.yyyy HH:mm"),
  },
  {
    accessorKey: "date_end",
    header: "End Date",
    cell: ({ row }) => format(row.getValue("date_end"), "dd.MM.yyyy HH:mm"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as ContractStatus;

      const toggleStatus = () => {
        console.log('click');
      };
      const statusColors: Record<ContractStatus, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        CANCELED: "bg-red-100 text-red-800",
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
    cell: ({ row }) => <ContractActions contract={row.original} />,
  },
];
