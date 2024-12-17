"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { ClientDialog } from "./client-dialog"
import { DeleteDialog } from "@/components/delete-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useSWRConfig } from "swr"
import { Client } from "./columns"

interface ClientActionsProps {
  client: Client
}

export function ClientActions({ client }: ClientActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { toast } = useToast()
  const { mutate } = useSWRConfig()

  const handleDelete = async () => {
    try {
      await fetch(`/api/clients/${client.id}`, {
        method: "DELETE",
      })
      toast({
        title: "Client deleted",
        description: "The client has been successfully deleted.",
      })
      mutate("/api/clients")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the client.",
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

      <ClientDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        client={client}
        onClose={() => {
          setIsEditOpen(false)
          mutate("/api/clients")
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