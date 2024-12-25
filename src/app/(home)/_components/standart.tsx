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
        Standard Conditions (included)
      </h2>
      <ul className="list-disc text-slate-700 pl-5 font-medium mt-5 text-[15px]">
        <li>Free cancellation up to 3 days</li>
        <li>Theft insurance</li>
        <li>{formatPrice(car.deposit)} insurance deductible</li>
        <li>Return the car with the same amount of fuel as when you picked it up or pay the difference</li>
        <li>Clean car when you pick it up and clean car when you return it or pay for a car wash</li>
      </ul>
    </div>
  );
};

export default StandardConditions;
