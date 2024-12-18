"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Validation schema with detailed messages
const clientSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters long." }),
  licenseNumber: z.string().min(5, { message: "License number must be at least 5 characters long." }),
  passportNumber: z.string().optional(), // паспортный номер (опционально)
  phone2: z.string().optional(), // второй телефон (опционально)
  status: z.string().optional(), // статус (опционально)
  locationId: z.number().optional(), // идентификатор локации (опционально)
  hotelName: z.string().optional(), // имя отеля (опционально)
});

export function ClientDialog({ open, onOpenChange, client, onClose }: any) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: client || {
      firstName: "",
      lastName: "",
      phone: "",
      licenseNumber: "",
      passportNumber: "",
      phone2: "",
      status: "active",
      locationId: 0,
      hotelName: "",
    },
  });

  const onSubmit = async (data: any) => {
    // Преобразование данных для соответствия модели базы данных
    const transformedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_1: data.phone,
      phone_2: data.phone2 || null,
      passport_number: data.passportNumber || "",
      status: data.status || "active",
      location_id: data.locationId ? Number(data.locationId) : 0, // Ensure it's a number, fallback to 0 if empty
      hotel_name: data.hotelName || "",
    };

    try {
      const response = await fetch(`/api/clients${client ? `/${client.id}` : ""}`, {
        method: client ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) throw new Error("Failed to save client");

      toast({
        title: client ? "Client updated" : "Client created",
        description: client ? "The client has been successfully updated." : "The client has been successfully created.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the client.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client ? "Edit Client" : "Add New Client"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Новые поля */}
            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hotelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
