import clsx from "clsx";
import React from "react";
import { Car } from "@/typing/interfaces";
import { formatPrice } from "@/lib/price";

interface PremiumConditionsProps {
  car: Car;
  className?: string;
  onSelect: () => void;
  onCancel: () => void;
  isSelected?: boolean;
}

const PremiumConditions: React.FC<PremiumConditionsProps> = ({ car, className, isSelected, onCancel, onSelect }) => {
  const premiumPrice = car.premiumExtraPrice ?? 400;

  return (
    <div className={clsx("bg-white p-4 rounded-md flex flex-col items-start", className)}>
      <h2
          className="font-bold text-[18px] text-slate-700 inline-flex items-center justify-center"
          onClick={(e) => {
              if (!isSelected) {
                  onSelect();
              } else {
                  //onCancel();
              }
          }}
      >
        <input type="checkbox" className="w-5 h-5 mr-2" readOnly checked={isSelected} />{" "}
        Premium Conditions
        <span className="text-base-black-secondary gap-2 font-normal text-sm ml-3">
            {formatPrice(premiumPrice)} per day
        </span>
      </h2>
      <ul className="list-disc text-slate-700 text-[15px] pl-5 font-medium mt-5">
        <li>Free cancel up to 48 hours</li>
        <li>Full Insurance</li>
        <li>Hijack insurance</li>
        <li>Civil liability insurance</li>
        <li>Crash insurance</li>
        <li>No Insurance franchise</li>
        <li>Second driver free</li>
        <li>Mileage without restrictions</li>
        <li>24/7 online support</li>
      </ul>
    </div>
  );
};

export default PremiumConditions;
