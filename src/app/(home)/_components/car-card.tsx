"use client";

import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import TransmissionIcon from "@/components/icons/transmission-icon";
import { Car } from "@/typing/interfaces";
import SeatIcon from "@/components/icons/seat-icon";
import Image from "next/image";
import EngineIcon from "@/components/icons/engine-icon";
import PremiumConditions from "./premium";
import StandartConditions from "./standart";
import { useSearchParams } from "next/navigation";
import CalendarIcon from "@/components/icons/calendar-days-icon";
import FuelIcon from "@/components/icons/fuel-icon";
import clsx from "clsx";
import SnowflakeIcon from "@/components/icons/snowflake";
import { calculateDailyCost } from "@/hooks/useTotalPriceDay";

const CarCard: FC<{ car: Car; className?: string }> = ({ car, className }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const params = useSearchParams();
  const startDate = Number(params.get("startDate")) ?? new Date().getTime();
  const endDate = Number(params.get("endDate")) ?? new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const locationFrom = Number(params.get("locationFrom")) ?? 1;
  const locationTo = Number(params.get("locationTo")) ?? 1;
  const daysQuantity = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const [timeStart, setTimeStart] = useState<string>(params.get("timeStart") ?? "10:00");
  const [timeEnd, setTimeEnd] = useState<string>(params.get("timeEnd") ?? "10:00");
  const [dayTotal, setDayTotal] = useState(0);

  const getCarBookingLink = useCallback(() => {
    return `/booking/${car.id}?startDate=${startDate}&endDate=${endDate}&timeStart=${timeStart}&timeEnd=${timeEnd}&isPremium=${isPremium}&locationFrom=${locationFrom}&locationTo=${locationTo}`;
  }, [isPremium, startDate, endDate, timeStart, timeEnd, locationFrom, locationTo]);

  useEffect(() => {
    // Ensure calculateDailyCost returns a number
    const calculatedPrice = calculateDailyCost(startDate ? new Date(startDate) : new Date(), car.pricePerDay, false, isPremium);
    setDayTotal(calculatedPrice);
  }, [car.pricePerDay, startDate, isPremium]); // Depend on car.pricePerDay and startDate
  return (
    <article>
      <div
        className={clsx(
          "flex gap-x-4 gap-y-1.5 rounded-t-2xl bg-white px-4 min-h-48 w-full max-md:grid-cols-1 max-md:gap-10 justify-between max-xl:grid max-xl:grid-cols-2",
          className,
        )}
      >
        <div className="row-span-3 relative w-[400px] max-md:w-full max-md:h-[300px] max-xl:w-full max-[500px]:h-[200px]">
          <Image src={car.imageUrl} alt={`${car.name} Image`} className="object-contain" sizes="100%, 100%" fill />
        </div>
        <div className="flex flex-col items-start md:py-8">
          <div className="col-span-2 flex items-center justify-between max-md:mx-auto">
            <h3>
              <Link href={getCarBookingLink()}>
                <span className="bg-base-bg-blue mr-4 rounded-sm px-2 py-1.5 text-sm">
                  {car.carBodyType.toUpperCase()}
                </span>
                <span className="text-lg font-semibold">{car.name}</span>
              </Link>
            </h3>
          </div>
          <div className="mt-6 mb-4 grid grid-cols-2 gap-2 max-md:mx-auto">
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
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(Math.round(dayTotal / 10) * 10);
              })()}
            </span>
            <span>per day</span>
          </p>
          <p className="text-base-black-secondary flex items-center justify-end gap-2 text-sm text-nowrap -translate-y-2">
            <span>
              Total:{" "}
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(Math.round((dayTotal * 3) / 10) * 10);
              })()}{" "}
              for {daysQuantity !== 0 ? daysQuantity : 3} days
            </span>
          </p>
          <Link
            href={getCarBookingLink()}
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
        <StandartConditions isPremium={isPremium} setIsPremium={setIsPremium} />
        <hr className="h-full w-full bg-tertiary-gray" />
        <PremiumConditions
          isChoosed={isPremium}
          onCancel={() => setIsPremium(false)}
          onChoose={() => setIsPremium(true)}
        />

        <div className=" pl-10 pr-10 max-md:flex sm:hidden gap-4 justify-between items-start space-y-2 md:py-8 max-md:mb-4">
          <div className="flex flex-col">
            <p className="text-base-black-secondary flex items-center justify-start max-xl:justify-start gap-2 text-sm text-nowrap">
              <span className="text-base-black text-2xl font-bold">
                {(() => {
                  return new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                    minimumFractionDigits: 0,
                  }).format(Math.round(dayTotal / 10) * 10);
                })()}
              </span>
              <span>per day</span>
            </p>
            <p className="text-base-black-secondary flex items-center justify-start max-xl:justify-start gap-2 text-sm text-nowrap -translate-y-2">
              <span>
                Total:{" "}
                {(() => {
                  return new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                    minimumFractionDigits: 0,
                  }).format(Math.round((dayTotal * 3) / 10) * 10);
                })()}{" "}
                for {daysQuantity !== 0 ? daysQuantity : 3} days
              </span>
            </p>
          </div>
          <Link
            href={getCarBookingLink()}
            className="flex w-min items-center rounded-lg bg-brand-base px-4 py-2 text-white ml-auto"
            onClick={(e) => {
                console.log("Generated link:", getCarBookingLink());
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
