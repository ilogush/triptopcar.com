"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/contracts/columns";
import { ContractDialog } from "@/components/contracts/contracts-dialog";
import { withRole } from "@/app/utils/withRole";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ContractsPage() {
  const { data: contracts, error } = useSWR("/api/contracts", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (error) return <div>Failed to load contracts</div>;
  if (!contracts) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">contracts Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add contracts
        </Button>
      </div>

      <DataTable columns={columns} data={contracts} />

      <ContractDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default withRole(ContractsPage, "owner");
