"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Car } from "@/components/data-table/columns";
import { withRole } from "@/app/utils/withRole";

// Схема валидации
const contractSchema = z.object({
  car_id: z.number().int().positive().nullable().optional(),
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
    .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, { message: "Invalid return time" })
    .nullable()
    .optional(),
  status: z.enum(["PENDING", "APPROVED", "COMPLETED"]).default("PENDING"),
});

function CreateContractPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [locations, setLocations] = useState([]);
  const [manager, setManager] = useState("");

  const form = useForm({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      car_id: null,
      rental_amount: 0,
      rental_currency: "THB",
      deposit_currency: "THB",
      pickup_location_id: null,
      client_name: "",
      client_passport_number: "",
      client_phone_number: "",
      client_second_phone_number: "",
      client_surname: "",
      date_start: "",
      date_end: "",
      dropoff_address: "",
      dropoff_location_id: null,
      full_insurance: false,
      manager: "",
      mileage_odo: 0,
      pickup_address: "",
      rental_deposit_amount: 0,
      rental_deposit_currency: "THB",
      time_return: null,
      status: "PENDING",
    },
  });

  // Получение имени из JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded?.name) {
          setManager(decoded.name);
          //   setManagerId(decoded.id);
          form.setValue("manager", decoded.name); // Устанавливаем в форму
          //   form.setValue("managerId", decoded.id); // Устанавливаем в форму
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, [form]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [carsResponse, locationsResponse] = await Promise.all([fetch("/api/cars"), fetch("/api/locations")]);

        const carsData = await carsResponse.json();
        const locationsData = await locationsResponse.json();

        setCars(carsData);
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchInitialData();
  }, []);

  const onSubmit = async (formData: any) => {
    try {
      const selectedCar = cars.find((car) => car.id === formData.car_id);
      const car_number = selectedCar ? selectedCar.car_number : null;

      const requestData = {
        contractData: {
          car_id: formData.car_id,
          rental_amount: formData.rental_amount,
          rental_currency: formData.rental_currency,
          deposit_currency: formData.deposit_currency,
          pickup_location_id: formData.pickup_location_id,
          date_start: formData.date_start,
          date_end: formData.date_end,
          dropoff_address: formData.dropoff_address,
          dropoff_location_id: formData.dropoff_location_id,
          full_insurance: formData.full_insurance,
          manager: manager, // Используем имя из JWT
          mileage_odo: formData.mileage_odo,
          pickup_address: formData.pickup_address,
          rental_deposit_amount: formData.rental_deposit_amount,
          rental_deposit_currency: formData.rental_deposit_currency,
          time_return: formData.time_return,
          status: formData.status,
        },
        clientData: {
          first_name: formData.client_name,
          last_name: formData.client_surname,
          passport_number: formData.client_passport_number,
          phone_1: formData.client_phone_number,
          phone_2: formData.client_second_phone_number,
        },
        paymentsData: [
          {
            payment_type: "Rental Payment", // Тип платежа
            amount: formData.rental_amount, // Сумма
            currency: formData.rental_currency, // Валюта
            created_at: new Date().toISOString(), // Дата платежа
            car_number,
            managerId: manager, // Можно заменить на ID менеджера, если есть
          },
        ],
      };

      // Отправка данных на сервер
      const response = await fetch(`/api/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to create contract");

      toast({
        title: "Success",
        description: "Contract created successfully.",
      });

      router.push("/dashboard/contracts");
    } catch (error) {
      console.error("Error submitting contract:", error);
      toast({
        title: "Error",
        description: "Failed to create contract.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Поля клиента */}
      <Input {...form.register("client_name")} placeholder="Client Name" />
      <Input {...form.register("client_surname")} placeholder="Client Surname" />
      <Input {...form.register("client_passport_number")} placeholder="Passport Number" />
      <Input {...form.register("client_phone_number")} placeholder="Phone Number" />
      <Input {...form.register("client_second_phone_number")} placeholder="Second Phone Number (Optional)" />

      {/* Поля контракта */}
      <Input {...form.register("rental_amount")} placeholder="Rental Amount" type="number" />
      <select {...form.register("rental_currency")}>
        <option value="THB">THB (Thai Baht)</option>
        <option value="USD">USD (US Dollar)</option>
        <option value="RUB">RUB (Russian Ruble)</option>
      </select>
      {/* Адреса забора и возврата */}
      <Input {...form.register("pickup_address")} placeholder="Pickup Address" />
      <Input {...form.register("dropoff_address")} placeholder="Dropoff Address" />

      {/* Валюта депозита */}
      <select {...form.register("deposit_currency")}>
        <option value="THB">THB (Thai Baht)</option>
        <option value="USD">USD (US Dollar)</option>
        <option value="RUB">RUB (Russian Ruble)</option>
      </select>
      {/* Даты */}
      <Input {...form.register("date_start")} type="date" />
      <Input {...form.register("date_end")} type="date" />

      {/* Пробег */}
      <Input {...form.register("mileage_odo")} type="number" placeholder="Mileage (Odometer)" />

      {/* Сумма депозита */}
      <Input {...form.register("rental_deposit_amount")} type="number" placeholder="Rental Deposit Amount" />

      {/* Чекбокс полной страховки */}
      <label>
        <input type="checkbox" {...form.register("full_insurance")} />
        Full Insurance
      </label>

      {/* Выпадающий список статуса */}
      <select {...form.register("status")}>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="COMPLETED">Completed</option>
      </select>

      {/* Кнопка отправки */}
      <Button type="submit">Create Contract</Button>
    </form>
  );
}

export default withRole(CreateContractPage, "owner");
