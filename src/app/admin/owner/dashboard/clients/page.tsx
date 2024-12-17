"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { columns } from "@/components/clients/columns"
import { DataTable } from "@/components/data-table/data-table"
import { ClientDialog } from "@/components/clients/client-dialog"
import useSWR from "swr"
import { withRole } from "@/app/utils/withRole"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function ClientsPage() {
  const { data: clients, error } = useSWR("/api/clients", fetcher)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (error) return <div>Failed to load clients</div>
  if (!clients) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <DataTable columns={columns} data={clients} />

      <ClientDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}

export default withRole(ClientsPage, "owner");
