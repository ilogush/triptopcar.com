"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CarDialog } from "@/components/car-dialog";
import { columns } from "@/components/data-table/columns";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { withRole } from "@/app/utils/withRole";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function CarsPage() {
  const { data: cars, error } = useSWR("/api/cars", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (error) return <div>Failed to load cars</div>;
  if (!cars) return <div>Loading...</div>;

  const carsArray = Array.isArray(cars.cars) ? cars.cars : Array.isArray(cars) ? cars : [];

  const filteredCars = carsArray.filter((car: any) => {
    const searchQuery = searchTerm.toLowerCase();

    // Проверяем все поля объекта на соответствие
    return Object.values(car).some((value) => {
      if (value === null || value === undefined) return false; // Пропускаем пустые значения
      return value.toString().toLowerCase().includes(searchQuery);
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cars</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Car
        </Button>
      </div>
      {/* Поле для поиска */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <DataTable columns={columns} data={filteredCars} />

      <CarDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

// Оборачиваем компонент CarsPage с ролью 'admin'
export default withRole(CarsPage, "owner");
