"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Hotels } from "./columns";

// Схема валидации для модели hotels
const hotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required").max(100, "Name must be less than 100 characters"),
  deliveryprice: z.number().min(0, "Delivery price is required"), // Валидация для deliveryPrice
});

type HotelFormData = {
  name: string; // Используйте name вместо hotel_name
  deliveryprice: number; // Добавьте deliveryPrice вместо google_maps_link
};

type HotelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel?: Hotels; // Используйте правильный тип Hotels
  onClose: () => void;
};

export function HotelDialog({ open, onOpenChange, hotel, onClose }: HotelDialogProps) {
  const { toast } = useToast();

  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: hotel
      ? {
          name: hotel.name,
        }
      : {
          name: "",
        },
  });

  const onSubmit = async (data: HotelFormData) => {
    try {
      const response = await fetch(`/api/hotels${hotel ? `/${hotel.id}` : ""}`, {
        method: hotel ? "PUT" : "POST", // PUT для редактирования, POST для создания
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save hotel");

      toast({
        title: hotel ? "Hotel updated" : "Hotel created",
        description: hotel ? "The hotel has been successfully updated." : "The hotel has been successfully created.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the hotel.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{hotel ? "Edit Hotel" : "Add New Hotel"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter hotel name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
