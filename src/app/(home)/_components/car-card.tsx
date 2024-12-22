"use client";

import Link from "next/link";
import { FC, useState } from "react";
import TransmissionIcon from "@/components/icons/transmission-icon";
import { Car } from "@/typing/interfaces";
import SeatIcon from "@/components/icons/seat-icon";
import Image from "next/image";
import EngineIcon from "@/components/icons/engine-icon";
import PremiumConditions from "./premium";
import StandardConditions from "./standart";
import CalendarIcon from "@/components/icons/calendar-days-icon";
import FuelIcon from "@/components/icons/fuel-icon";
import clsx from "clsx";
import SnowflakeIcon from "@/components/icons/snowflake";
import { formatPrice, useCriteriaParams } from "@/lib/price";
import { calculateRentCost } from "@/lib/calculateRentCost";
import { MIN_RENTAL_PERIOD } from "@/lib/config";

interface CarCardProps {
  car: Car;
  className?: string;
}

const CarCard: FC<CarCardProps> = ({ car, className }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const criteria = useCriteriaParams();

  const startDate = criteria.startDate;
  const endDate = criteria.endDate;

  const daysQuantity = criteria.daysQuantity;

  const getCarBookingLink = criteria.bookingLinkByCar(car);

  const carRentPrice = calculateRentCost(car, startDate, endDate, isPremium);

  const handleAddPremium = () => {
    setIsPremium(true);
  };

  const handleRemovePremium = () => {
    setIsPremium(false);
  };

  if (daysQuantity < MIN_RENTAL_PERIOD) {
    return (
      <>
        <article>
          <p className="mt-1 text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">
            Минимальный период аренды ${MIN_RENTAL_PERIOD} дня.
          </p>
        </article>
      </>
    );
  }

  return (
    <article>
      <div
        className={clsx(
          "flex gap-x-4 gap-y-1.5 rounded-t-2xl bg-white px-4 min-h-48 w-full max-md:grid-cols-1 max-md:gap-10 justify-between max-xl:grid max-xl:grid-cols-2",
          className,
        )}
      >
        <div className="row-span-2 relative w-[400px] max-md:w-full max-md:h-[300px] max-xl:w-full max-[500px]:h-[200px]">
          <Image src={car.imageUrl} alt={`${car.name} Image`} className="object-contain" sizes="100% 100%" fill />
        </div>
        <div className="flex flex-col items-start md:py-8">
          <div className="">
            <h3>
              <Link href={getCarBookingLink}>
                <span className="bg-base-bg-blue mr-4 rounded-sm px-2 py-1.5 text-sm">
                  {car.carBodyType.toUpperCase()}
                </span>
                <span className="text-lg font-semibold">{car.name}</span>
              </Link>
            </h3>
          </div>
          <div className="mt-6 mb-4 grid grid-cols-2 gap-2 ">
            <span className="flex items-center gap-1">
              <TransmissionIcon className="w-6 h-6" /> {car.transmissionType}
            </span>
            <span className="flex items-center gap-1">
              <FuelIcon className="w-6 h-6" /> {car.fuelType}
            </span>
            <span className="flex items-center gap-1">
              <SnowflakeIcon className="w-6 h-6" /> Air Condition
            </span>
            <span className="flex items-center gap-1">
              <SeatIcon className="w-6 h-6" /> {car.seatsQuantity} seats
            </span>
            <span className="flex items-center gap-1">
              <EngineIcon className="w-6 h-6" /> {car.engineCapacity}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-6 h-6" /> {car.year}
            </span>
          </div>
        </div>

        <div className="space-y-2 md:py-8 max-md:mb-4 flex flex-col items-end max-md:hidden sm:flex">
          <p className="text-base-black-secondary flex items-center justify-end gap-2 text-sm text-nowrap">
            <span className="text-base-black text-2xl font-bold">
                {formatPrice(carRentPrice / daysQuantity)}
            </span>
            <span>per day</span>
          </p>
          <p className="text-base-black-secondary flex items-center justify-end gap-2 text-sm text-nowrap -translate-y-2">
            <span>
              Total: {formatPrice(carRentPrice)} for {daysQuantity} days
            </span>
          </p>
          <Link
            href={getCarBookingLink}
            className="flex w-min items-center rounded-lg bg-brand-base px-4 py-2 text-white ml-auto"
            onClick={(e) => {
              console.log("Link clicked!");
              // Убедитесь, что preventDefault() не используется здесь
            }}
          >
            Book <span className="text-lg ml-2">{">"}</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1px_1fr] rounded-b-2xl mx-auto w-full pl-10 bg-white max-sm:grid-cols-1 max-sm:pl-0 max-sm:mx-auto border-t">
        <StandardConditions
          car={car}
          isPremium={isPremium}
          removePremium={() => handleRemovePremium()}
        />

        <hr className="h-full w-full bg-tertiary-gray" />

        <PremiumConditions
          car={car}
          isSelected={isPremium}
          onCancel={() => handleRemovePremium()}
          onSelect={() => handleAddPremium()}
        />

        <div className=" pl-10 pr-10 max-md:flex sm:hidden gap-4 justify-between items-start space-y-2 md:py-8 max-md:mb-4">
          <div className="flex flex-col">
            <p className="text-base-black-secondary flex items-center justify-start max-xl:justify-start gap-2 text-sm text-nowrap">
              <span className="text-base-black text-2xl font-bold">
                  {formatPrice(carRentPrice / daysQuantity)}
              </span>
              <span>per day</span>
            </p>
            <p className="text-base-black-secondary flex items-center justify-start max-xl:justify-start gap-2 text-sm text-nowrap -translate-y-2 py-2">
              <span>
                Total: {formatPrice(carRentPrice)} for {daysQuantity} days
              </span>
            </p>
          </div>
          <Link
            href={getCarBookingLink}
            className="flex w-min items-center rounded-lg bg-brand-base px-4 py-2 text-white ml-auto"
            onClick={(e) => {
              console.log("Generated link:", getCarBookingLink);
            }}
          >
            Book <span className="text-lg ml-2">{">"}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
