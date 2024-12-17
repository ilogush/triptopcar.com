"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { columns } from "@/components/payments/columns"
import { DataTable } from "@/components/data-table/data-table"
import { PaymentDialog } from "@/components/payments/payment-dialog"
import useSWR from "swr"
import { withRole } from "@/app/utils/withRole"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function PaymentsPage() {
  const { data: payments, error } = useSWR("/api/payments", fetcher)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (error) return <div>Failed to load payments</div>
  if (!payments) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment
        </Button>
      </div>

      <DataTable columns={columns} data={payments} />

      <PaymentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}

export default withRole(PaymentsPage, "owner");
