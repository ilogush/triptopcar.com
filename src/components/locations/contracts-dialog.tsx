"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Location } from "./columns";

// Схема валидации для модели locations
const locationSchema = z.object({
  name: z.string().min(1, "Location name is required").max(100, "Name must be less than 100 characters"),
  deliveryprice: z.number().min(0, "Delivery price is required"), // Валидация для deliveryPrice
});

type LocationFormData = {
  name: string; // Используйте name вместо hotel_name
  deliveryprice: number; // Добавьте deliveryPrice вместо google_maps_link
};

type LocationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: Location; // Используйте правильный тип Location, который включает id, name, и deliveryPrice
  onClose: () => void;
};

export function LocationDialog({ open, onOpenChange, location, onClose }: LocationDialogProps) {
  const { toast } = useToast();

  const form = useForm<Location>({
    resolver: zodResolver(locationSchema),
    defaultValues: location
      ? {
          name: location.name,
          deliveryprice: location.deliveryprice,
        }
      : {
          name: "",
          deliveryprice: 0,
        },
  });

  const onSubmit = async (data: LocationFormData) => {
    try {
      const response = await fetch(`/api/locations${location ? `/${location.id}` : ""}`, {
        method: location ? "PUT" : "POST", // PUT для редактирования, POST для создания
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save location");

      toast({
        title: location ? "Location updated" : "Location created",
        description: location
          ? "The location has been successfully updated."
          : "The location has been successfully created.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the location.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{location ? "Edit Location" : "Add New Location"}</DialogTitle>
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
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter location name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter delivery price" />
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
