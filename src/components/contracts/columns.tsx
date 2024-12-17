import { ColumnDef } from "@tanstack/react-table";
import { ContractActions } from "../contracts/actions";

// Определяем тип ContractStatus
export type ContractStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELED";
export type Contract = {
    id: number;
    car_id: number | null;
    rental_amount: number; // Можно использовать string, если используется Decimal в базе данных
    rental_currency: string;
    deposit_currency: string;
    pickup_location_id: number | null;
    address_return: string;
    amount: number; // Можно использовать string, если используется Decimal в базе данных
    client_name: string;
    client_passport_number: string;
    client_phone_number: string;
    client_second_phone_number?: string;
    client_surname: string;
    date_end: Date; // Используем Date вместо string
    date_start: Date; // Используем Date вместо string
    dropoff_address: string;
    dropoff_location_id: number | null;
    full_insurance: boolean;
    location_return: string;
    manager: string;
    mileage_odo: number;
    pickup_address: string;
    rental_deposit_amount: number; // Можно использовать string, если используется Decimal в базе данных
    rental_deposit_currency: string;
    time_return: Date | null; // Используем Date вместо string | null
    status: ContractStatus;
    client_id: number;
  };


// Определение колонок таблицы
export const columns: ColumnDef<Contract>[] = [
  { accessorKey: "id", header: "ID", size: 50, cell: ({ row }) => `#${row.getValue("id")}` },
  { accessorKey: "manager", header: "Manager", cell: ({ row }) => row.getValue("manager") },
  { accessorKey: "client_name", header: "Client Name", cell: ({ row }) => row.getValue("client_name") },
  { accessorKey: "client_surname", header: "Client Surname", cell: ({ row }) => row.getValue("client_surname") },
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as ContractStatus;
      const statusColors: Record<ContractStatus, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        ACTIVE: "bg-green-100 text-green-800",
        COMPLETED: "bg-blue-100 text-blue-800",
        CANCELED: "bg-red-100 text-red-800",
      };
      return (
        <span
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
