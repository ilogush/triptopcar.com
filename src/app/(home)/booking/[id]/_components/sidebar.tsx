"use client";

import { areas } from "@/app/(home)/_data/areas.data";
import { useDropoffPrice, usePickupPrice, useTotalPrice } from "@/hooks/useTotalPrice";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import BookCar from "./bookCar";
import { calculateDailyCost } from "@/hooks/useTotalPriceDay";
import RentalIncludes from "@/app/(home)/booking/[id]/_components/RentalIncludes";

interface BookingSidebarProps {
  className?: string;
  car: Car;
}

const BookingSidebar: React.FC<BookingSidebarProps> = React.memo(({ className, car }) => {
  const searchParams = useSearchParams();

  const locationFrom = Number(searchParams.get("locationFrom")) !== 0 ? Number(searchParams.get("locationFrom")) : 1;

  const locationTo = Number(searchParams.get("locationTo")) !== 0 ? Number(searchParams.get("locationTo")) : 1;

  const startDate = new Date(
    Number(searchParams.get("startDate")) !== 0 ? Number(searchParams.get("startDate")) : new Date().getTime(),
  );

  const [timeStart, setTimeStart] = useState<string>(searchParams.get("timeStart") ?? "10:00");
  const [timeEnd, setTimeEnd] = useState<string>(searchParams.get("timeEnd") ?? "10:00");

  const endDate = new Date(
    Number(searchParams.get("endDate")) !== 0
      ? Number(searchParams.get("endDate"))
      : new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
  );

  const daysQuantity = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const isPremium = searchParams.get("isPremium") === "true";

  const [includeChildSeat, setIncludeChildSeat] = useState(false);
  const [dayTotal, setDayTotal] = useState(0);

  const pickupLocationId = Number(searchParams.get("locationFrom")) || 1;
  const dropoffLocationId = Number(searchParams.get("locationTo")) || 1;

  const totalPrice = useMemo(() => {
    return useTotalPrice({
      car,
      daysQuantity,
      isPremium,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      includeChildSeat: false,
      pickupLocationId: pickupLocationId,
      dropoffLocationId: dropoffLocationId,
    });
  }, [car.id]);

  const pickupPrice = useMemo(() => {
    return usePickupPrice(pickupLocationId);
  }, [pickupLocationId]);

  const dropoffPrice = useMemo(() => {
    return useDropoffPrice(dropoffLocationId);
  }, [dropoffLocationId]);

  useEffect(() => {
    if (!(startDate.getTime() + 1) || !(endDate.getTime() + 1)) {
      notFound();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    // Ensure calculateDailyCost returns a number
    const calculatedPrice = calculateDailyCost(
      startDate ? new Date(startDate) : new Date(),
      car.pricePerDay,
      false,
      isPremium,
    );
    setDayTotal(calculatedPrice);
  }, [car.pricePerDay, startDate]); // Depend on car.pricePerDay and startDate
  return (
    <aside className={clsx("w-full h-full flex flex-col gap-6 sticky top-5", className)}>
      <div className="flex flex-col w-full bg-white rounded-lg p-[20px_10px_80px_10px] relative">
        <div className="w-full flex flex-col justify-between h-full">
          <div className="flex">
            <div className="basis-1/6 flex items-center flex-col">
              <div className="h-[60%] relative flex items-center flex-col translate-y-2">
                <div className="absolute w-2 aspect-square rounded-full bg-tertiary-gray z-[2]" />
                <hr className="h-full w-0.5 bg-tertiary-gray" />
                <div className="absolute bottom-0 w-2 aspect-square rounded-full bg-tertiary-gray z-[2]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-5">
                <h4 className="font-bold text-2xl text-slate-700 mb-4">Pick-up</h4>
                <p className="text-slate-800">
                  {new Date(startDate).toLocaleDateString()} at {timeStart}
                  <br />
                  {areas.find((area) => area.id === Number(locationFrom))?.name}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-2xl text-slate-700 mb-4">Drop-off</h4>
                <p className="text-slate-800">
                  {new Date(endDate).toLocaleDateString()} at {timeEnd}
                  <br />
                  {areas.find((area) => area.id === Number(locationTo))?.name}
                </p>
              </div>
            </div>
          </div>
          {/* Вставляем ссылку внизу */}
          <Link href="/" className="absolute bottom-4 right-4 rounded-md px-4 py-2 text-blue-500">
            <div className="flex gap-3">
              <span className="flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 14.205V16.7792C3 17.3315 3.44772 17.7792 4 17.7792H6.60902C6.86041 17.7792 7.10257 17.6845 7.2873 17.514L19.2789 6.44487C19.6793 6.07523 19.7101 5.45301 19.348 5.0457L16.6909 2.05647C16.3138 1.63221 15.6595 1.60656 15.2504 2L3.30689 13.4841C3.11081 13.6727 3 13.9329 3 14.205Z"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <rect x="2.5" y="20.7792" width="19" height="1" rx="0.5" stroke="black" />
                  <rect
                    x="9.25676"
                    y="16.2431"
                    width="6.29428"
                    height="1"
                    rx="0.5"
                    transform="rotate(-135 9.25676 16.2431)"
                    stroke="black"
                  />
                </svg>
              </span>
              Change Date
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg p-5">
        <h3 className="font-bold text-2xl text-slate-700">Price Details</h3>
        <div className="flex w-full items-start justify-between gap-3 mt-4">
          <h4 className="text-lg font-bold text-slate-700">Car rental fee</h4>
          <div className="text-right flex flex-col items-end gap-1">
            <span className="text-slate-700">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  minimumFractionDigits: 0,
                  currency: "THB",
                }).format(Math.round((dayTotal * 3) / 10) * 10);
              })()}
            </span>
            <p className="text-gray-500 text-sm">
              Approx.{" "}
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(Math.round(dayTotal / 10) * 10);
              })()}
              x{daysQuantity} days
            </p>
          </div>
        </div>

        {/*<ul className="list-disc text-slate-700 pl-5 font-medium mt-5">*/}
        {/*  <li>1 additional driver</li>*/}
        {/*  <li>Unlimited Mileage</li>*/}
        {/*  <li>Full to Full</li>*/}
        {/*  <li>*/}
        {/*    Taxed and fees {"("}including airport tax, customer facility fee, tourism tax, and sales tax{")"}*/}
        {/*  </li>*/}
        {/*  <li>Basic Rental Fee</li>*/}
        {/*</ul>*/}
        <div className="w-full mt-5 text-slate-700">
          <RentalIncludes label="" />
        </div>

        <div className="w-full border-t-2 mt-5 pt-5 border-dashed border-tertiary-gray">
          <div className={clsx("flex items-start justify-between gap-4", isPremium && "line-through")}>
            <h4 className="text-gray-500">Refundable Deposit</h4>
            <h4 className="text-gray-500">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(car.deposit);
              })()}
            </h4>
          </div>

          {/* Pick-up */}
          <div className={clsx("flex items-start justify-between gap-4")}>
            <h4 className="text-gray-500">Pick-up fee</h4>
            <h4 className="text-gray-500">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(pickupPrice);
              })()}
            </h4>
          </div>

          {/* Drop-off */}
          <div className={clsx("flex items-start justify-between gap-4")}>
            <h4 className="text-gray-500">Drop-off fee</h4>
            <h4 className="text-gray-500">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(dropoffPrice);
              })()}
            </h4>
          </div>

          {/* Tax */}
          <div className={clsx("flex items-start justify-between gap-4")}>
            <h4 className="text-gray-500">Tax fee (7%)</h4>
            <h4 className="text-gray-500">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(totalPrice * 0.07);
              })()}
            </h4>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h4 className="font-bold text-xl text-slate-700">Total</h4>
            <h4 className="text-slate-700 font-bold text-xl">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(totalPrice);
              })()}
            </h4>
          </div>
        </div>
      </div>
      <BookCar car={car} />
    </aside>
  );
});

export default dynamic(() => Promise.resolve(BookingSidebar), { ssr: false });
