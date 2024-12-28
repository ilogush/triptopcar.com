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
import { jwtDecode } from "jwt-decode";

// Схема валидации для модели contracts
const contractSchema = z.object({
  car_id: z.number().int().positive().nullable().optional(), // Добавлено поле car_id
  client_id: z.number().int().positive().nullable().optional(),
  rental_amount: z.coerce.number().positive("Enter a valid rental amount"),
  rental_currency: z.string().length(3, "Rental currency must be 3 characters"),
  deposit_currency: z.string().length(3, "Deposit currency must be 3 characters"),
  pickup_location_id: z.number().int().nullable().optional(),
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
  const [name, setName] = useState("");
  const [location, setLocation] = useState<Location[]>([]);
  const [managerId, setManagerId] = useState<number>();

  const form = useForm({
    resolver: zodResolver(contractSchema),
    defaultValues: contract || {
      car_id: contract?.car_id || cars.length > 0 ? cars[0].id : null,
      rental_amount: 0,
      rental_currency: "THB",
      deposit_currency: "THB",
      pickup_location_id: null,
      client_name: "",
      client_passport_number: "",
      client_phone_number: "",
      client_second_phone_number: "",
      client_surname: "",
      date_start: contract?.date_start ? new Date(contract.date_start).toISOString().split("T")[0] : "",
      date_end: contract?.date_end ? new Date(contract.date_end).toISOString().split("T")[0] : "",
      dropoff_address: "",
      dropoff_location_id: null,
      full_insurance: false,
      manager: "",
      mileage_odo: 0,
      pickup_address: "",
      rental_deposit_amount: 0,
      rental_deposit_currency: "THB",
      time_return: contract?.time_return || null,
      status: "PENDING",
    },
  });

  const onSubmit = async (formData: any) => {
    if (!formData.car_id) {
      toast({ title: "Error", description: "Car must be selected.", variant: "destructive" });
      return;
    }

    if (!formData.date_start || !formData.date_end) {
      toast({ title: "Error", description: "Both start and end dates are required.", variant: "destructive" });
      return;
    }

    if (new Date(formData.date_start) > new Date(formData.date_end)) {
      toast({
        title: "Error",
        description: "End date must be after the start date.",
        variant: "destructive",
      });
      return;
    }

    // Дополнительные проверки для клиента и платежа
    if (!formData.client_name || !formData.client_passport_number || !formData.client_phone_number) {
      toast({
        title: "Error",
        description: "Client name, passport number, and phone number are required.",
        variant: "destructive",
      });
      return;
    }

    const selectedCar = cars.find((car) => car.id === formData.car_id);

    if (selectedCar) {
      const carOde = selectedCar.ode ?? 0; // Если ode undefined, используется 0 или другое значение по умолчанию
      if (formData.mileage_odo < carOde) {
        toast({
          title: "Error",
          description: `Mileage must be greater than the current mileage of the car (${carOde}).`,
          variant: "destructive",
        });
        return;
      }
    } else {
      toast({
        title: "Error",
        description: "Selected car is not found.",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedCar = cars.find((car) => car.id === formData.car_id);
      const car_number = selectedCar ? selectedCar.car_number : null;
      // Подготовка данных для API
      const requestData = {
        contractData: {
          car_id: formData.car_id,
          rental_amount: formData.rental_amount,
          rental_currency: formData.rental_currency,
          deposit_currency: formData.deposit_currency,
          pickup_location_id: formData.pickup_location_id,
          date_end: formData.date_end,
          date_start: formData.date_start,
          dropoff_address: formData.dropoff_address,
          dropoff_location_id: formData.dropoff_location_id,
          full_insurance: formData.full_insurance,
          manager: name,
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
            amount: formData.rental_amount || 0, // Сумма платежа
            currency: formData.currency || "THB", // Валюта платежа
            created_at: formData.payment_date || new Date().toISOString(), // Дата платежа
            car_number,
            managerId,
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
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token); // Декодируем токен
        setName(decoded.name); // Сохраняем имя в состояние
        setManagerId(decoded.id);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

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

  useEffect(() => {
    if (contract && name) {
      form.reset({
        ...contract,
        car_id: contract.car_id || (cars.length > 0 ? cars[0].id : null),
        date_start: contract.date_start ? new Date(contract.date_start).toISOString().split("T")[0] : "",
        date_end: contract.date_end ? new Date(contract.date_end).toISOString().split("T")[0] : "",
        time_return: contract.time_return ? new Date(contract.time_return).toISOString().slice(11, 16) : null,
        manager: name || "",
      });
    }
  }, [contract, cars, name, form]); // Добавлен 'name' как зависимость

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contract ? "Edit Contract" : "Add New Contract"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            className="space-y-6 p-4 sm:p-6 md:p-8 rounded-lg  shadow-md"
          >
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
                      className="input w-[70%]"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")}
                    >
                      <option value="" style={{ color: "#333" }}>
                        Select Car
                      </option>
                      {cars.map((car: Car) => (
                        <option key={car.id} value={car.id} style={{ color: "#333" }}>
                          {`${car.brand} ${car.model} (${car.car_number})`} {/* Отображаем номер машины */}
                        </option>
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
                    <select {...field} style={{ color: "black" }}>
                      <option value="THB">THB (Thai Baht)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="RUB">RUB (Russian Ruble)</option>
                    </select>
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
                    <select {...field} style={{ color: "black" }}>
                      <option value="THB">THB (Thai Baht)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="RUB">RUB (Russian Ruble)</option>
                    </select>
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
                    <select {...field} style={{ color: "black" }}>
                      <option value="THB">THB (Thai Baht)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="RUB">RUB (Russian Ruble)</option>
                    </select>
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
                    <Input {...field} type="time" value={field.value || ""} />
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
