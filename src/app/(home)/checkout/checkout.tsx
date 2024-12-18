"use client";

import clsx from "clsx";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Car } from "../_components/car-card";

interface CheckoutProps {
  className?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ className }) => {
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const timeStart = searchParams.get("timeStart") ?? "10:00";
  const timeEnd = searchParams.get("timeEnd") ?? "10:00";

  const isPremium = searchParams.get("isPremium") === "true";
  const startDate = new Date(Number(searchParams.get("startDate"))) ?? new Date();
  const endDate = new Date(Number(searchParams.get("endDate"))) ?? new Date();
  const dropoffLocation = searchParams.get("dropoffLocation");
  const pickupLocation = searchParams.get("pickupLocation");
  const fullName = searchParams.get("fullName");
  const phone = searchParams.get("phone");

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные с API
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/cars"); // Ваш API-эндпоинт
        if (!res.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await res.json();
        setCars(data.cars);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  const car = cars.find((car) => car.id === Number(carId));

  useEffect(() => {
    if (loading) return; // Ждем завершения загрузки

    if (
      !car ||
      !carId ||
      !String(isPremium) ||
      !startDate ||
      !endDate ||
      !dropoffLocation ||
      !pickupLocation ||
      !fullName ||
      !phone ||
      !timeStart ||
      !timeEnd
    ) {
      notFound();
    }
  }, [car, carId, isPremium, startDate, endDate, dropoffLocation, pickupLocation, fullName, phone, timeStart, timeEnd]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f4f7fa] min-h-[60vh] flex items-center justify-center flex-col gap-8 m-8">
      <div className={clsx("bg-white py-5 px-8 rounded-lg shadow-lg w-full max-w-3xl", className)}>
        <h2 className=" text-3xl font-bold text-slate-700 mb-5">Checkout Details</h2>
        <ul className="flex flex-col list-disc gap-3 mx-auto ml-[1rem]">
          <li>
            Car: {car?.brand} {car?.model}
          </li>
          <li>Pickup Location: {pickupLocation}</li>
          <li>Dropoff Location: {dropoffLocation}</li>
          <li>Insurance: {isPremium ? "Full" : "Standard"}</li>
          <li>Days: {Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)}</li>
          <li>Start Date: {startDate.toLocaleDateString()}</li>
          <li>Start Time: {timeStart}</li> {/* Добавлено */}
          <li>End Date: {endDate.toLocaleDateString()}</li>
          <li>End Time: {timeEnd}</li> {/* Добавлено */}
          <li>Full Name: {fullName}</li>
          <li>Phone: {phone}</li>
        </ul>

        <p className="mt-10">Await confirmation. Thanks for using our service!</p>
      </div>
      <div className={clsx("bg-white py-5 px-8 rounded-lg shadow-lg w-full max-w-3xl", className)}>
        <h2 className=" text-3xl font-bold text-slate-700 mb-5">Useful information</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nobis blanditiis ullam animi earum
          nesciunt veniam, perspiciatis laborum consectetur vitae nihil reprehenderit enim est tempore perferendis
          temporibus nemo culpa cumque.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
