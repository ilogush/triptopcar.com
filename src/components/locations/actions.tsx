"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteDialog } from "@/components/delete-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { LocationDialog } from "./contracts-dialog";
import { Location } from "./columns";

interface LocationActionsProps {
  location: Location;
}

export function LocationActions({ location }: LocationActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await fetch(`/api/locations/${location.id}`, {
        method: "DELETE",
      });
      toast({
        title: "Location deleted",
        description: "The location has been successfully deleted.",
      });
      mutate("/api/locations");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the location.",
        variant: "destructive",
      });
    }
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsDeleteOpen(true)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <LocationDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        location={location} // Передаем данные локации
        onClose={() => {
          setIsEditOpen(false);
          mutate("/api/locations");
        }}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
