"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { cars } from "../_data/cars.data";
import { FC } from "react";
import { useCriteriaParams } from "@/lib/price";

interface CheckoutProps {
  className?: string;
}

const Checkout: FC<CheckoutProps> = ({ className }) => {
  const criteria = useCriteriaParams();

  const startDate = criteria.startDate;
  const endDate = criteria.endDate;

  const startTime = criteria.startTime;
  const endTime = criteria.endTime;

  const isPremium = criteria.isPremium;

  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");
  const car = cars.find((car) => car.id === Number(carId));

  const fullName = searchParams.get("fullName");
  const phone = searchParams.get("phone");

  return (
    <div className="bg-[#f4f7fa] min-h-[60vh] flex items-center justify-center flex-col gap-8 m-8">
      <div
        className={clsx(
          "bg-white py-5 px-8 rounded-lg shadow-lg w-full max-w-3xl",
          className,
        )}
      >
        <h2 className=" text-3xl font-bold text-slate-700 mb-5">
          Checkout Details
        </h2>
        <ul className="flex flex-col list-disc gap-3 mx-auto ml-[1rem]">
          <li>Car: {car?.name}</li>
          <li>Pickup Location: {criteria.locationFromName}</li>
          <li>Dropoff Location: {criteria.locationToName}</li>
          <li>Insurance: {isPremium ? "Full" : "Standard"}</li>
          <li>
            Days: {criteria.daysQuantity}
          </li>
          <li>Start Date: {startDate.toLocaleDateString()}</li>
          <li>Start Time: {startTime}</li>
          {/* Добавлено */}
          <li>End Date: {endDate.toLocaleDateString()}</li>
          <li>End Time: {endTime}</li>
          {/* Добавлено */}
          <li>Full Name: {fullName}</li>
          <li>Phone: {phone}</li>
        </ul>

        <p className="mt-10">
          Await confirmation.
          <br />
          Thank you for using our service!
        </p>
      </div>
    </div>
  );
};

export default Checkout;
