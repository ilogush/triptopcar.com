import clsx from "clsx";
import { FC } from "react";
import { Car } from "@/typing/interfaces";
import { formatPrice } from "@/lib/price";

interface StandardConditionsProps {
  car: Car;
  className?: string;
  isPremium: boolean;
  removePremium: () => void;
}

const StandardConditions: FC<StandardConditionsProps> = ({ car, className, isPremium, removePremium }) => {
  return (
    <div
      className={clsx(
        "bg-white p-4 rounded-md flex flex-col items-start",
        className,
      )}
    >
      <h2
        className="font-bold text-[18px] text-slate-700 inline-flex items-center"
        onClick={(e) => {
          if (isPremium) {
            removePremium();
          }
        }}
      >
        <input type="checkbox" className="w-5 h-5 mr-2" readOnly checked={!isPremium} />{" "}
        Стандартный пакет
      </h2>
      <ul className="list-disc text-slate-700 pl-5 font-medium mt-5 text-[15px]">
        <li>Бесплатная отмена бронирования за 3 дня</li>
        <li>Страхование от угона</li>
        <li>{formatPrice(car.deposit)} страховая франшиза</li>
        <li>Возвращайте автомобиль с тем же количеством топлива как при получении или оплачиваете разницу</li>
        <li>Чистый автомобиль при получении и чистый автомобиль при возврате или оплата мойки автомобиля</li>
      </ul>
    </div>
  );
};

export default StandardConditions;
