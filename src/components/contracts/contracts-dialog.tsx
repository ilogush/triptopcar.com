"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Car } from "../data-table/columns";
import { Location } from "../locations/columns";

// Схема валидации для модели contracts
const contractSchema = z.object({
  car_id: z.number().int().positive().nullable().optional(), // Добавлено поле car_id
  client_id: z.number().int().positive().nullable().optional(),
  rental_amount: z.coerce.number().positive("Enter a valid rental amount"),
  rental_currency: z.string().length(3, "Rental currency must be 3 characters"),
  deposit_currency: z.string().length(3, "Deposit currency must be 3 characters"),
  pickup_location_id: z.number().int().nullable().optional(),
  address_return: z.string().max(255, "Address return must be less than 255 characters"),
  amount: z.coerce.number().positive("Enter a valid amount"),
  client_name: z.string().max(100, "Client name must be less than 100 characters"),
  client_passport_number: z.string().max(50, "Passport number must be less than 50 characters"),
  client_phone_number: z.string().max(20, "Phone number must be less than 20 characters"),
  client_second_phone_number: z.string().max(20).optional(),
  client_surname: z.string().max(100, "Client surname must be less than 100 characters"),
  date_end: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end date" }),
  date_start: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid start date" }),
  dropoff_address: z.string().max(255, "Dropoff address must be less than 255 characters"),
  dropoff_location_id: z.number().int().nullable().optional(),
  full_insurance: z.boolean().optional(),
  location_return: z.string().max(255, "Location return must be less than 255 characters"),
  manager: z.string().max(100, "Manager name must be less than 100 characters"),
  mileage_odo: z.number().int().positive("Mileage must be a positive number"),
  pickup_address: z.string().max(255, "Pickup address must be less than 255 characters"),
  rental_deposit_amount: z.coerce.number().positive("Enter a valid deposit amount"),
  rental_deposit_currency: z.string().length(3, "Rental deposit currency must be 3 characters"),
  time_return: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, {
      message: "Invalid return time",
    })
    .nullable()
    .optional(),
  status: z.enum(["PENDING", "APPROVED", "COMPLETED"]).default("PENDING"),
});

export function ContractDialog({ open, onOpenChange, contract, onClose }: any) {
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [location, setLocation] = useState<Location[]>([]);
  const form = useForm({
    resolver: zodResolver(contractSchema),
    defaultValues: contract || {
      car_id: cars.length > 0 ? cars[0].id : null,
      rental_amount: 0,
      rental_currency: "USD",
      deposit_currency: "USD",
      pickup_location_id: null,
      address_return: "",
      amount: 0,
      client_name: "",
      client_passport_number: "",
      client_phone_number: "",
      client_second_phone_number: "",
      client_surname: "",
      date_end: "",
      date_start: "",
      dropoff_address: "",
      dropoff_location_id: null,
      full_insurance: false,
      location_return: "",
      manager: "",
      mileage_odo: 0,
      pickup_address: "",
      rental_deposit_amount: 0,
      rental_deposit_currency: "USD",
      time_return: null,
      status: "PENDING",
    },
  });

  const onSubmit = async (formData: any) => {
    console.log("onSubmit called", formData);

    try {
      // Подготовка данных для API
      const requestData = {
        contractData: {
          rental_amount: formData.rental_amount,
          rental_currency: formData.rental_currency,
          deposit_currency: formData.deposit_currency,
          pickup_location_id: formData.pickup_location_id,
          address_return: formData.address_return,
          amount: formData.amount,
          date_end: formData.date_end,
          date_start: formData.date_start,
          dropoff_address: formData.dropoff_address,
          dropoff_location_id: formData.dropoff_location_id,
          full_insurance: formData.full_insurance,
          location_return: formData.location_return,
          manager: formData.manager,
          mileage_odo: formData.mileage_odo,
          pickup_address: formData.pickup_address,
          rental_deposit_amount: formData.rental_deposit_amount,
          rental_deposit_currency: formData.rental_deposit_currency,
          time_return: formData.time_return,
        },
        clientData: {
          first_name: formData.client_name,
          last_name: formData.client_surname,
          passport_number: formData.client_passport_number,
          phone_1: formData.client_phone_number,
          phone_2: formData.client_second_phone_number,
          status: formData.status,
        },
        paymentsData: [
          {
            payment_type: formData.payment_type || "Rental Payment", // Тип платежа
            amount: formData.payment_amount || 0, // Сумма платежа
            currency: formData.currency || "USD", // Валюта платежа
            created_at: formData.payment_date || new Date().toISOString(), // Дата платежа
          },
        ],
      };

      const response = await fetch(`/api/contracts${contract ? `/${contract.id}` : ""}`, {
        method: contract ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Передаем подготовленные данные
      });

      if (!response.ok) throw new Error("Failed to save contract");

      toast({
        title: contract ? "Contract updated" : "Contract created",
        description: contract
          ? "The contract has been successfully updated."
          : "The contract has been successfully created.",
      });
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to save the contract.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const carRes = await fetch("/api/cars");
        const carData = await carRes.json();
        console.log(carData);

        const locationRes = await fetch("/api/locations");
        const locationData = await locationRes.json();
        console.log(locationData);

        setLocation(locationData);

        // Извлекаем массив cars из объекта
        if (Array.isArray(carData.cars)) {
          setCars(carData.cars);
        } else {
          console.error("Полученные данные не являются массивом:", carData);
          setCars([]); // Устанавливаем пустой массив в случае ошибки
        }
      } catch (error) {
        console.error("Ошибка при получении данных", error);
      }
    }

    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contract ? "Edit Contract" : "Add New Contract"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="car_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car</FormLabel>
                  <FormControl>
                    <select
                      style={{ color: "#333" }}
                      {...field}
                      className="input"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} // Преобразуем значение в число
                    >
                      {" "}
                      <option value="" style={{ color: "#333" }}>
                        Select Car
                      </option>
                      {cars.map((car: Car) => (
                        <option
                          key={car.id}
                          value={car.id}
                          style={{ color: "#333" }}
                        >{`${car.brand} ${car.model}`}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client Fields */}
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter client name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Surname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter client surname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_passport_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Passport Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter passport number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_second_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Second Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter second phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Contract Fields */}
            <FormField
              control={form.control}
              name="rental_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Amount</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 100.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rental_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Currency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="USD" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dropoff and Pickup Locations */}
            <FormField
              control={form.control}
              name="pickup_location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location ID</FormLabel>
                  <FormControl>
                    <select
                      style={{ color: "#333" }}
                      {...field}
                      className="input"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} // Преобразуем значение в число
                    >
                      {" "}
                      <option style={{ color: "#333" }} value="">
                        Select Location
                      </option>
                      {location.map((el: Location) => (
                        <option style={{ color: "#333" }} key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoff_location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Location ID</FormLabel>
                  <FormControl>
                    <select
                      style={{ color: "#333" }}
                      {...field}
                      className="input"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} // Преобразуем значение в число
                    >
                      {" "}
                      <option style={{ color: "#333" }} value="">
                        Select Location
                      </option>
                      {location.map((el: Location) => (
                        <option style={{ color: "#333" }} key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickup_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter pickup address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoff_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter dropoff address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Deposit Currency */}
            <FormField
              control={form.control}
              name="deposit_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Currency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., USD" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Return */}
            <FormField
              control={form.control}
              name="address_return"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Return</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter return address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="e.g., 150.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Return */}
            <FormField
              control={form.control}
              name="location_return"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Return</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter return location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Manager */}
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter manager name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mileage */}
            <FormField
              control={form.control}
              name="mileage_odo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage (Odometer)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter mileage"
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} // Преобразуем значение в число
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rental Deposit Amount */}
            <FormField
              control={form.control}
              name="rental_deposit_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Deposit Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="e.g., 200.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rental Deposit Currency */}
            <FormField
              control={form.control}
              name="rental_deposit_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Deposit Currency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., USD" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dates */}
            <FormField
              control={form.control}
              name="date_start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time_return"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Insurance */}
            <FormField
              control={form.control}
              name="full_insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Insurance</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="checkbox"
                      checked={field.value}
                      onChange={() => field.onChange(!field.value)}
                    />
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
                    <select style={{ color: "#333" }} {...field} className="input" value={field.value || ""}>
                      <option style={{ color: "#333" }} value="PENDING">
                        Pending
                      </option>
                      <option style={{ color: "#333" }} value="APPROVED">
                        Approved
                      </option>
                      <option style={{ color: "#333" }} value="COMPLETED">
                        Completed
                      </option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Final buttons */}
            <Button type="submit">{contract ? "Save Changes" : "Create Contract"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
