"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { PaymentDialog } from "./payment-dialog"
import { DeleteDialog } from "@/components/delete-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useSWRConfig } from "swr"
import { Payment } from "./columns"

interface PaymentActionsProps {
  payment: Payment
}

export function PaymentActions({ payment }: PaymentActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { toast } = useToast()
  const { mutate } = useSWRConfig()

  const handleDelete = async () => {
    try {
      await fetch(`/api/payments/${payment.id}`, {
        method: "DELETE",
      })
      toast({
        title: "Payment deleted",
        description: "The payment has been successfully deleted.",
      })
      mutate("/api/payments")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the payment.",
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

      <PaymentDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        payment={payment}
        onClose={() => {
          setIsEditOpen(false)
          mutate("/api/payments")
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