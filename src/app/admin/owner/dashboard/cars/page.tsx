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

  if (error) return <div>Failed to load cars</div>;
  if (!cars) return <div>Loading...</div>;

  const carsData = cars || []; // Получаем данные или пустой массив, если нет машин

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cars Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Car
        </Button>
      </div>

      <DataTable columns={columns} data={cars.cars ? cars.cars : cars} />

      <CarDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

// Оборачиваем компонент CarsPage с ролью 'admin'
export default withRole(CarsPage, "owner");
