"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import CarCard, { Car } from "./car-card";
import { CarBodyType } from "@/typing/interfaces";
import { carTypes } from "../_data/carTypes.data";
import dynamic from "next/dynamic";
import clsx from "clsx";

type SortOption = "price-low-to-high" | "price-high-to-low";

interface Option {
  value: SortOption;
  label: string;
}

const sortOptions: Option[] = [
  {
    value: "price-low-to-high",
    label: "Price: Low to High",
  },
  {
    value: "price-high-to-low",
    label: "Price: High to Low",
  },
];

const defaultSort: Option = sortOptions[0];

type SortHandler = (a: Car, b: Car) => number;

const sortHandlers: Record<SortOption, SortHandler> = {
  "price-low-to-high": (a: Car, b: Car) => a.price_per_day - b.price_per_day,
  "price-high-to-low": (a: Car, b: Car) => b.price_per_day - a.price_per_day,
};

const CarCatalog = () => {
  const [carTypesFilter, setCarTypesFilter] = useState<CarBodyType[]>([]);
  const [sort, setSort] = useState<Option | null>(defaultSort);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные с API
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/cars"); // Ваш API-эндпоинт
        if (!res.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await res.json();
        setCars(data.cars);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const carsForRender = cars
    .filter(
      (car) => (carTypesFilter.length === 0 || carTypesFilter.includes(car.car_body_type as any)) && car.is_available, // Фильтруем по доступности
    )
    .sort(sortHandlers[sort?.value || "price-high-to-low"]);

  const toggleCarType = (type: CarBodyType) => {
    setCarTypesFilter(
      (prev) => (prev.includes(type) ? [] : [type]), // Если тип уже выбран, сбрасываем фильтр, иначе выбираем новый тип
    );
  };

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-3">
        <ul className="flex gap-8 max-xl:gap-2 font-bold uppercase *:grid *:basis-full *:place-items-center *:rounded-sm *:border *:border-tertiary-gray *:p-2 max-[600px]:grid max-[600px]:grid-cols-3 max-[600px]:px-20 max-[500px]:px-0 max-[425px]:grid-cols-3">
          <li className={clsx("max-xl:scale-90")}>
            <button className="w-full h-full" onClick={() => setCarTypesFilter([])}>
              All
            </button>
          </li>
          {carTypes.map((carType) => (
            <li
              key={carType.id}
              className={clsx(
                carTypesFilter.includes(carType.name as any) && "bg-tertiary-gray",
                "max-xl:scale-90 max-md:w-full max-md:h-full",
              )}
            >
              <button
                className="w-full h-full aspect-square justify-center flex items-center gap-4 flex-col text-slate-800"
                onClick={() => toggleCarType(carType.name as any)}
              >
                <span className="max-md:text-xs">{carType.name}</span>
                {carType.icon}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 max-[350px]:flex-col">
        <Select
          classNamePrefix="react-select"
          placeholder="Sort by price"
          options={sortOptions}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "var(--brand-base)",
            },
            borderRadius: 4,
          })}
          onChange={setSort}
          value={sort}
        />
        <span>{carsForRender.length} cars found</span>
      </div>
      <div className="space-y-4 h-full flex flex-col w-full">
        {carsForRender.map((car) => (
          <CarCard key={car.id} car={car} className="bg-white" />
        ))}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(CarCatalog), { ssr: false });
