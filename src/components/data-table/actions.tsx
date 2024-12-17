"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { CarDialog } from "@/components/car-dialog"
import { DeleteDialog } from "@/components/delete-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useSWRConfig } from "swr"
import { Car } from "./columns"

interface CarActionsProps {
  car: Car
}

export function CarActions({ car }: CarActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { toast } = useToast()
  const { mutate } = useSWRConfig()

  const handleDelete = async () => {
    try {
      await fetch(`/api/cars/${car.id}`, {
        method: "DELETE",
      })
      toast({
        title: "Car deleted",
        description: "The car has been successfully deleted.",
      })
      mutate("/api/cars")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the car.",
        variant: "destructive",
      })
    }
    setIsDeleteOpen(false)
  }

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

      <CarDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        car={car}
        onClose={() => {
          setIsEditOpen(false)
          mutate("/api/cars")
        }}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </>
  )
}