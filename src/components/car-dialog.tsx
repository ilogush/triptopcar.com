"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const carSchema = z.object({
  year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year."),
  car_body_type: z.string().min(2, "Body type is required."),
  fuel_type: z.string().min(2, "Fuel type is required."),
  price_per_day: z.preprocess((val) => Number(val), z.number().min(1, "Price per day must be at least 1")),
  image_url: z.string(),
  engine_capacity: z.string().nullable().optional(),
  seats_quantity: z.preprocess((val) => Number(val), z.number().min(1, "Seats quantity must be at least 1")),
  deposit: z.preprocess((val) => Number(val), z.number().min(0, "Deposit must be at least 0")),
  transmission_type: z.string().min(2, "Transmission type is required."),
  car_number: z.string().min(2, "Car number is required."),
  color: z.string().min(2, "Color is required."),
  brand: z.string().min(2, "Brand must be at least 2 characters long."),
  model: z.string().min(2, "Model must be at least 2 characters long."),
  ode: z.preprocess((val) => (val ? Number(val) : null), z.number().nullable().optional()),
  oil_last_change: z.preprocess((val) => (val ? Number(val) : null), z.number().nullable().optional()),
  is_available: z.boolean().optional().default(true),
});

export function CarDialog({ open, onOpenChange, car, onClose }: any) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(carSchema),
    defaultValues: car || {
      year: "",
      car_body_type: "",
      fuel_type: "",
      price_per_day: 0,
      image_url: "",
      engine_capacity: "",
      seats_quantity: 1,
      deposit: 0,
      transmission_type: "",
      brand: "",
      model: "",
      car_number: "",
      color: "",
      ode: null,
      oil_last_change: 0,
      is_available: true,
    },
  });

  useEffect(() => {
    if (car) {
      form.reset({
        ...car,
        oil_last_change: car.oil_last_change || null,
      });
    } else {
      form.reset({
        year: "",
        car_body_type: "",
        fuel_type: "",
        price_per_day: 0,
        image_url: "",
        engine_capacity: "",
        seats_quantity: 1,
        deposit: 0,
        transmission_type: "",
        brand: "",
        model: "",
        car_number: "",
        color: "",
        ode: null,
        oil_last_change: null,
        is_available: true,
      });
    }
  }, [car, form]);

  const onSubmit = async (data: any) => {
    const transformedData = {
      ...data,
      price_per_day: Number(data.price_per_day),
      seats_quantity: Number(data.seats_quantity),
      deposit: Number(data.deposit),
      ode: data.ode ? Number(data.ode) : null,
      oil_last_change: data.oil_last_change ? Number(data.oil_last_change) : null,
      is_available: data.is_available ?? true,
    };

    try {
      const response = await fetch(`/api/cars${car ? `/${car.id}` : ""}`, {
        method: car ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) throw new Error("Failed to save car");

      const updatedCar = await response.json();

      toast({
        title: car ? "Car updated" : "Car created",
        description: car ? "The car has been successfully updated." : "The car has been successfully created.",
      });

      form.reset(updatedCar);
      onClose(updatedCar);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the car.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{car ? "Edit Car" : "Add New Car"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4 sm:p-6 md:p-8 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available</FormLabel>
                  <FormControl>
                    <Input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="car_body_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_per_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Day</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="engine_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engine Capacity</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seats Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transmission_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transmission Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="car_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage (Odometer)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oil_last_change"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oil Change (km)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {car ? "Update Car" : "Add Car"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
