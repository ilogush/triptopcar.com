"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { PaymentDialog } from "./payment-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useSWRConfig } from "swr"
import { Payment } from "./columns"

interface PaymentActionsProps {
  payment: Payment
}

export function PaymentActions({ payment }: PaymentActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { toast } = useToast()
  const { mutate } = useSWRConfig()

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
          <Pencil className="h-4 w-4" />
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
    </>
  )
}
