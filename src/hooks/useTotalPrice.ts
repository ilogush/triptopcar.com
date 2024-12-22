import { areas } from "@/app/(home)/_data/areas.data";
import { calculateRentCost } from "@/lib/calculateRentCost";
import { Car } from "@/typing/interfaces";

export function useTotalPrice(
  {
    isPremium,
    car,
    startDate,
    endDate,
    pickupLocationId,
    dropoffLocationId,
  }: {
    isPremium: boolean;
    car: Car;
    startDate: Date;
    endDate: Date;
    pickupLocationId: number;
    dropoffLocationId: number;
  },
) {
  // Вычисляем стоимость аренды
  const baseRentalFee = calculateRentCost(car, startDate, endDate, isPremium);

  // Стоимость доставки за пункты выдачи и возврата
  const pickupLocation = areas.find((area) => area.id === pickupLocationId);
  const dropoffLocation = areas.find((area) => area.id === dropoffLocationId);
  const deliveryFee = (pickupLocation?.deliveryPrice || 0) + (dropoffLocation?.deliveryPrice || 0);

  // Итоговая стоимость
  const totalPrice = baseRentalFee + deliveryFee;

  return Math.round(totalPrice);
}

export function usePickupPrice(pickupLocationId: number) {
  const pickupLocation = areas.find((area) => area.id === pickupLocationId);
  const deliveryFee = pickupLocation?.deliveryPrice || 0;

  return Math.round(deliveryFee);
}

export function useDropoffPrice(dropoffLocationId: number) {
  const dropoffLocation = areas.find((area) => area.id === dropoffLocationId);
  const deliveryFee = dropoffLocation?.deliveryPrice || 0;

  return Math.round(deliveryFee);
}
