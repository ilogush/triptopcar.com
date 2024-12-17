import { areas } from "@/app/(home)/_data/areas.data";
import { calculateRentCost } from "@/lib/calculateRentCost";
import { Car } from "@/typing/interfaces";

export function useTotalPrice({
  isPremium,
  daysQuantity,
  car,
  startDate,
  endDate,
  includeChildSeat,
  pickupLocationId,
  dropoffLocationId,
}: {
  isPremium: boolean;
  daysQuantity: number;
  car: Car;
  startDate: Date;
  endDate: Date;
  includeChildSeat: boolean;
  pickupLocationId: number;
  dropoffLocationId: number;
}) {
  const dailyRate = car.pricePerDay; // Базовая стоимость за день
  const deposit = car.deposit; // Возвратный депозит

  // Вычисляем стоимость аренды
  const baseRentalFee = calculateRentCost(startDate, endDate, dailyRate, includeChildSeat);

  // Премиальная страховка (опционально)
  const insuranceFee = isPremium ? 400 * daysQuantity : 0;

  // Стоимость доставки за пункты выдачи и возврата
  const pickupLocation = areas.find((area) => area.id === pickupLocationId);
  const dropoffLocation = areas.find((area) => area.id === dropoffLocationId);
  const deliveryFee = (pickupLocation?.deliveryPrice || 0) + (dropoffLocation?.deliveryPrice || 0);

  // Итоговая стоимость
  const totalPrice = baseRentalFee + insuranceFee + deliveryFee;

  // Логирование для отладки
  // console.log("Вызов useTotalPrice", { isPremium, daysQuantity, car, startDate, endDate, includeChildSeat, pickupLocation, dropoffLocation });
  // console.log("totalPrice", Math.round(totalPrice));

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
