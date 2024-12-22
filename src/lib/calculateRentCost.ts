// Ваш код с определением функций и сезонов
import { Car } from "@/typing/interfaces";
import { getDaysDiff } from "@/lib/price";

function roundUpToHundredThousand(value: number): number {
  return value; // Убираем округление
}

type Season = {
  name: string;
  start: { day: number; month: number };
  end: { day: number; month: number };
  coefficient: number;
};

// Сезоны и их коэффициенты
const seasons: Season[] = [
  {
    name: "medium",
    start: { day: 10, month: 11 },
    end: { day: 14, month: 12 },
    coefficient: 1.65,
  },
  {
    name: "peak",
    start: { day: 15, month: 12 },
    end: { day: 20, month: 1 },
    coefficient: 2.15,
  },
  {
    name: "high",
    start: { day: 21, month: 1 },
    end: { day: 28, month: 2 },
    coefficient: 1.9,
  },
  {
    name: "low",
    start: { day: 1, month: 3 },
    end: { day: 9, month: 11 },
    coefficient: 1.0,
  },
];

interface Duration {
  start: number;
  end: number;
}

interface DurationCoefficient extends Duration {
  coefficient: number;
}

const durations: DurationCoefficient[] = [
  { start: 1, end: 3, coefficient: 1 },
  { start: 4, end: 7, coefficient: 0.9 },
  { start: 8, end: 14, coefficient: 0.8 },
  { start: 15, end: 21, coefficient: 0.7 },
  { start: 22, end: Math.min(), coefficient: 0.6 },
];

interface DurationChildSeat extends Duration {
  pricePerDay: number;
}

const childSeatDurations: DurationChildSeat[] = [
  {
    start: 1,
    end: 7,
    pricePerDay: 150,
  },
  {
    start: 8,
    end: 14,
    pricePerDay: 100,
  },
  {
    start: 15,
    end: Math.min(),
    pricePerDay: 80,
  },
];

function isDateInSeason(
  date: Date,
  start: { day: number; month: number },
  end: { day: number; month: number },
): boolean {
  const current = { day: date.getDate(), month: date.getMonth() + 1 };

  // Если сезон не переходит через Новый год
  if (start.month < end.month || (start.month === end.month && start.day <= end.day)) {
    return (
      (current.month > start.month || (current.month === start.month && current.day >= start.day)) &&
      (current.month < end.month || (current.month === end.month && current.day <= end.day))
    );
  }

  // Если сезон переходит через Новый год
  return (
    current.month > start.month ||
    (current.month === start.month && current.day >= start.day) ||
    current.month < end.month ||
    (current.month === end.month && current.day <= end.day)
  );
}

// Функция для получения коэффициента сезона для конкретной даты
export function getSeasonCoefficient(date: Date): number {
  for (const season of seasons) {
    if (isDateInSeason(date, season.start, season.end)) {
      return season.coefficient;
    }
  }
  throw new Error("Сезон для данной даты не найден");
}

// Функция для получения коэффициента продолительности для конкретного диапазона
function getDurationCoefficient(duration: number): number {
  for (const d of durations) {
    if (d.start <= duration && d.end >= duration) {
      return d.coefficient;
    }
  }

  throw new Error("Продолжительность для данной даты не найдена");
}

export function getDurationChildSeatPricePerDay(duration: number): number {
  for (const d of childSeatDurations) {
    if (d.start <= duration && d.end >= duration) {
      return d.pricePerDay;
    }
  }
  throw new Error("Продолжительность для данной даты не найдена");
}

export function calculateChildSeatPrice(startDateTime: Date, endDateTime: Date): number {
  const days = getDaysDiff(endDateTime, startDateTime);

  return getDurationChildSeatPricePerDay(days) * days;
}

export function calculateRentCost(
  car: Car,
  startDate: Date,
  endDate: Date,
  isPremium: boolean = false,
): number {

  const dailyRate = car.pricePerDay; // Базовая стоимость за день
  const premiumDailyRate = car.premiumExtraPrice ?? 0; // Базовая стоимость за день

  // Проверяем, есть ли сезон для даты начала
  if (
    !isDateInSeason(startDate, seasons[0].start, seasons[0].end) &&
    !isDateInSeason(startDate, seasons[1].start, seasons[1].end) &&
    !isDateInSeason(startDate, seasons[2].start, seasons[2].end) &&
    !isDateInSeason(startDate, seasons[3].start, seasons[3].end)
  ) {
    throw new Error("Сезон для даты начала не найден");
  }

  // Проверяем, есть ли сезон для даты окончания
  if (
    !isDateInSeason(endDate, seasons[0].start, seasons[0].end) &&
    !isDateInSeason(endDate, seasons[1].start, seasons[1].end) &&
    !isDateInSeason(endDate, seasons[2].start, seasons[2].end) &&
    !isDateInSeason(endDate, seasons[3].start, seasons[3].end)
  ) {
    throw new Error("Сезон для даты окончания не найден");
  }

  let totalCost = 0;
  for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    const coefficient = getSeasonCoefficient(currentDate);
    //console.log(`Дата: ${currentDate.toLocaleDateString()} - Коэффициент: ${coefficient}`);

    totalCost += dailyRate * coefficient;
  }

  const durationCoefficient = getDurationCoefficient(getDaysDiff(endDate, startDate));
  //console.log(`Коэффициент продолжительности: ${durationCoefficient}`);

  totalCost = roundUpToHundredThousand(totalCost * durationCoefficient);

  // if (false) {
  //   const childSeatCost = calculateChildSeatPrice(startDate, endDate);
  //   //console.log(`Стоимость детского кресла: ${childSeatCost}`);
  //
  //   totalCost += childSeatCost;
  // }

  if (isPremium) {
    const premiumPrice = premiumDailyRate ?? 400;
    totalCost = totalCost + premiumPrice;
  }

  return totalCost;
}
