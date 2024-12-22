import { addDays, differenceInDays, format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { MIN_RENTAL_PERIOD } from "@/lib/config";
import { areas } from "@/app/(home)/_data/areas.data";
import { Car } from "@/typing/interfaces";
import { useDropoffPrice, usePickupPrice, useTotalPrice } from "@/hooks/useTotalPrice";
import { calculateRentCost } from "@/lib/calculateRentCost";

export function formatPrice(price: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    minimumFractionDigits: 0,
    currency: "THB",
  }).format(Math.round(price / 10) * 10);
}

export function getDaysDiff(date1: Date, date2: Date): number {
  const days = Math.abs(differenceInDays(date1, date2));

  return days;
}

export function formatDateToYMD(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function buildDateFromYMD(dateString: string) {
  return parseISO(dateString);
}

type SearchCriteria = {
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string,
  daysQuantity: number,
  locationFromId: number,
  locationFromName?: string,
  locationToId: number,
  locationToName?: string,
  isPremium: boolean,
  pickupPrice: () => number;
  dropoffPrice: () => number;
  rentCostByCar: (car: Car) => number;
  totalPriceByCar: (car: Car) => number;
  bookingLinkByCar: (car: Car) => string;
}

export function useCriteriaParams(): SearchCriteria {
  const searchParams = useSearchParams();

  const startDate = buildDateFromYMD(searchParams.get("startDate") ?? formatDateToYMD(new Date()));
  const endDate = buildDateFromYMD(searchParams.get("endDate") ?? formatDateToYMD(addDays(startDate, MIN_RENTAL_PERIOD)));

  const locationFromId = Number(searchParams.get("locationFrom")) !== 0 ? Number(searchParams.get("locationFrom")) : 1;
  const locationToId = Number(searchParams.get("locationTo")) !== 0 ? Number(searchParams.get("locationTo")) : 1;

  const locationFromName = areas.find(
    (area) => area.id === locationFromId,
  )?.name;

  const locationToName = areas.find(
    (area) => area.id === locationToId,
  )?.name;

  const daysQuantity = getDaysDiff(startDate, endDate);

  const startTime = searchParams.get("startTime") ?? "10:00";
  const endTime = searchParams.get("endTime") ?? "10:00";

  const isPremium = searchParams.get("isPremium") === "true" || searchParams.get("isPremium") === '1';

  return {
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    endTime: endTime,
    daysQuantity: daysQuantity,
    locationFromId: locationFromId,
    locationFromName: locationFromName,
    locationToId: locationToId,
    locationToName: locationToName,
    isPremium: isPremium,
    pickupPrice: function(): number {
      return usePickupPrice(locationFromId);
    },
    dropoffPrice: function(): number {
      return useDropoffPrice(locationToId);
    },
    rentCostByCar: function(car: Car): number {
      return calculateRentCost(car, startDate, endDate, isPremium);
    },
    totalPriceByCar: function(car: Car): number {
      return useTotalPrice({
        car,
        isPremium: isPremium,
        startDate: startDate,
        endDate: endDate,
        pickupLocationId: locationFromId,
        dropoffLocationId: locationToId,
      });
    },
    bookingLinkByCar: function(car: Car): string {
      const getCarBookingLink = `/booking/${car.id}?startDate=${formatDateToYMD(startDate)}&endDate=${formatDateToYMD(endDate)}&startTime=${startTime}&endTime=${endTime}&isPremium=${isPremium}&locationFrom=${locationFromId}&locationTo=${locationToId}`;

      return getCarBookingLink;
    },
  };
}
