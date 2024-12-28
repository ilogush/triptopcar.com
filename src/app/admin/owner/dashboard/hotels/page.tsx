"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { withRole } from "@/app/utils/withRole";
import { HotelDialog } from "@/components/hotels/hotel-dialog";
import { columns } from "@/components/hotels/columns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function HotelsPage() {
  const { data, error } = useSWR("/api/hotels", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (error) return <div>Failed to load hotels</div>;
  if (!data) return <div>Loading...</div>;

  // Проверяем, является ли data массивом
  const hotels = Array.isArray(data) ? data : [];

  // Фильтрация списка отелей на основе строки поиска
  const filteredHotels = hotels.filter((hotel: any) => {
    const searchQuery = searchTerm.toLowerCase();

    // Проверяем все поля объекта на соответствие строке поиска
    return Object.values(hotel).some((value) => {
      if (value === null || value === undefined) return false; // Пропускаем пустые значения
      return value.toString().toLowerCase().includes(searchQuery);
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hotels</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </Button>
      </div>

      {/* Поле для поиска */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <DataTable columns={columns} data={filteredHotels} />

      <HotelDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default withRole(HotelsPage, "owner");
