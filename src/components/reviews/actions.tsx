"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteDialog } from "@/components/delete-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { ReviewsDialog } from "./reviews-dialog";
import { reviews } from "@prisma/client";

interface reviewActionsProps {
  review: reviews;
}

export function ReviewActions({ review }: reviewActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
      });
      toast({
        title: "review deleted",
        description: "The review has been successfully deleted.",
      });
      mutate("/api/reviews");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the review.",
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

      <ReviewsDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        review={review} // Передаем данные локации
        onClose={() => {
          setIsEditOpen(false);
          mutate("/api/reviews");
        }}
      />

      <DeleteDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} onConfirm={handleDelete} />
    </>
  );
}
