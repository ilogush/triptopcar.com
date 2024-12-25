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
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  daysQuantity: number;
  locationFromId: number;
  locationFromName?: string;
  locationToId: number;
  locationToName?: string;
  isPremium: boolean;
  pickupPrice: () => number;
  dropoffPrice: () => number;
  rentCostByCar: (car: Car) => number;
  totalPriceByCar: (car: Car) => number;
  bookingLinkByCar: (car: Car) => string;
};

export function useCriteriaParams(): Booking {
  const searchParams = useSearchParams();

  const startDate = buildDateFromYMD(searchParams.get("startDate") ?? formatDateToYMD(new Date()));
  const endDate = buildDateFromYMD(
    searchParams.get("endDate") ?? formatDateToYMD(addDays(startDate, MIN_RENTAL_PERIOD)),
  );

  const locationFromId = Number(searchParams.get("locationFrom")) !== 0 ? Number(searchParams.get("locationFrom")) : 1;
  const locationToId = Number(searchParams.get("locationTo")) !== 0 ? Number(searchParams.get("locationTo")) : 1;

  const locationFromName = areas.find((area) => area.id === locationFromId)?.name ?? null;
  const locationToName = areas.find((area) => area.id === locationToId)?.name ?? null;

  const daysQuantity = getDaysDiff(startDate, endDate);

  const startTime = searchParams.get("startTime") ?? "10:00";
  const endTime = searchParams.get("endTime") ?? "10:00";

  const isPremium = searchParams.get("isPremium") === "true" || searchParams.get("isPremium") === "1";

  return new Booking(
    startDate,
    endDate,
    startTime,
    endTime,
    daysQuantity,
    locationFromId,
    locationFromName,
    locationToId,
    locationToName,
    isPremium,
  );
}

class Booking {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  daysQuantity: number;
  locationFromId: number;
  locationFromName?: null | string;
  locationToId: number;
  locationToName?: null | string;
  isPremium: boolean;

  constructor(
    startDate: Date,
    endDate: Date,
    startTime: string,
    endTime: string,
    daysQuantity: number,
    locationFromId: number,
    locationFromName: string | null,
    locationToId: number,
    locationToName: string | null,
    isPremium: boolean,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.daysQuantity = daysQuantity;
    this.locationFromId = locationFromId;
    this.locationFromName = locationFromName;
    this.locationToId = locationToId;
    this.locationToName = locationToName;
    this.isPremium = isPremium;
  }

  pickupPrice(): number {
    return usePickupPrice(this.locationFromId);
  }

  dropoffPrice(): number {
    return useDropoffPrice(this.locationToId);
  }

  rentCostByCar(car: Car): number {
    return calculateRentCost(car, this.startDate, this.endDate, this.isPremium);
  }

  totalPriceByCar(car: Car): number {
    return useTotalPrice({
      car,
      isPremium: this.isPremium,
      startDate: this.startDate,
      endDate: this.endDate,
      pickupLocationId: this.locationFromId,
      dropoffLocationId: this.locationToId,
    });
  }

  bookingLinkByCar(car: Car): string {
    const premium = this.isPremium ? "1" : "0";

    const getCarBookingLink = `/booking/${car.id}?startDate=${formatDateToYMD(this.startDate)}&endDate=${formatDateToYMD(this.endDate)}&startTime=${this.startTime}&endTime=${this.endTime}&isPremium=${premium}&locationFrom=${this.locationFromId}&locationTo=${this.locationToId}`;

    return getCarBookingLink;
  }
}
