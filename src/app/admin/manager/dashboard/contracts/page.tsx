"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/contracts/columns-manager";
import { ContractDialog } from "@/components/contracts/contracts-dialog";
import { withRole } from "@/app/utils/withRole";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ContractsPage() {
  const { data: contracts, error } = useSWR("/api/contracts", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  if (error) return <div>Failed to load contracts</div>;
  if (!contracts) return <div>Loading...</div>;

  // Сортировка контрактов по дате time_return
  const sortedContracts = [...contracts].sort((a: any, b: any) => {
    if (!a.time_return || !b.time_return) return 0; // Если date отсутствует, не сортируем
    const dateA = new Date(a.time_return);
    const dateB = new Date(b.time_return);

    if (sortDirection === "asc") {
      return dateA.getTime() - dateB.getTime(); // Сортировка по возрастанию
    } else if (sortDirection === "desc") {
      return dateB.getTime() - dateA.getTime(); // Сортировка по убыванию
    }

    return 0; // Если направление не задано, не сортируем
  });

  // Фильтрация по строке поиска
  const filteredContracts = sortedContracts.filter((contract: any) => {
    const searchQuery = searchTerm.toLowerCase();

    return Object.values(contract).some((value) => {
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(searchQuery);
    });
  });

  // Переключение сортировки по дате
  const toggleSort = () => {
    setSortDirection((prevDirection) => {
      if (prevDirection === "asc") return "desc"; // Если сортировка по возрастанию, меняем на убывание
      if (prevDirection === "desc") return null; // Если сортировка по убыванию, сбрасываем
      return "asc"; // Иначе сортировка по возрастанию
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contracts Management</h1>
        <div className="flex gap-4">
          {/* Кнопка для переключения сортировки */}
          <div className="flex items-center space-x-4">
            <Button onClick={toggleSort}>
              Sort by Date ({sortDirection === "asc" ? "Ascending" : sortDirection === "desc" ? "Descending" : "None"})
            </Button>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contract
          </Button>
        </div>
      </div>

      {/* Поле для поиска */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <DataTable columns={columns} data={filteredContracts} />

      <ContractDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default withRole(ContractsPage, "manager");
