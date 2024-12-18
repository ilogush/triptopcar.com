"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteDialog } from "@/components/delete-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { ContractDialog } from "./contracts-dialog";
import { Contract } from "./columns";

interface ContractActionsProps {
  contract: Contract;
}

export function ContractActions({ contract }: ContractActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await fetch(`/api/contracts/${contract.id}`, {
        method: "DELETE",
      });
      toast({
        title: "Contract deleted",
        description: "The contract has been successfully deleted.",
      });
      mutate("/api/contracts");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the contract.",
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

      <ContractDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        contract={contract} // Передаем данные контракта
        onClose={() => {
          setIsEditOpen(false);
          mutate("/api/contracts");
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
