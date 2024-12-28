"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/locations/columns";
import { LocationDialog } from "@/components/locations/contracts-dialog";
import { withRole } from "@/app/utils/withRole";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LocationsPage() {
  const { data: locations, error } = useSWR("/api/locations", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (error) return <div>Failed to load locations</div>;
  if (!locations) return <div>Loading...</div>;

  // Фильтрация данных для поиска
  const filteredLocations = locations.filter((location: any) => {
    const searchQuery = searchTerm.toLowerCase();

    return Object.values(location).some((value) => {
      if (value === null || value === undefined) return false; // Пропускаем пустые значения
      return value.toString().toLowerCase().includes(searchQuery);
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Locations</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add locations
        </Button>
      </div>

      {/* Поле для поиска */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <DataTable columns={columns} data={filteredLocations} />

      <LocationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default withRole(LocationsPage, "owner");
