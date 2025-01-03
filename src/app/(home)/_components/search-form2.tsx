"use client";

import { FC, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import CalendarIcon from "@/components/icons/calendar-days-icon";
import Calendar11Icon from "@/components/icons/calendar-days11-icon";
import Select, { DropdownIndicatorProps } from "react-select";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { areas } from "../_data/areas.data";
import SearchIcon from "@/components/icons/search-icon";
import { formatDateToYMD, useCriteriaParams } from "@/lib/price";
import { addDays } from "date-fns";
import { MIN_RENTAL_PERIOD } from "@/lib/config";

const searchFormSchema = z.object({
  locationTo: z.number(),
  locationFrom: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

const SearchForm2: FC = () => {
  const [delayedLoading, setDelayedLoading] = useState(false);

  const criteria = useCriteriaParams();

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      locationTo: 1,
      locationFrom: 1,
      startDate: criteria.startDate,
      endDate: criteria.endDate,
      startTime: criteria.startTime,
      endTime: criteria.endTime,
    },
  });

  useEffect(() => {
    const currentEndDate = form.getValues("endDate");
    const newEndDate = addDays(form.watch("startDate"), MIN_RENTAL_PERIOD);

    if (currentEndDate < newEndDate) {
      form.setValue("endDate", newEndDate);
    }
  }, [form.watch("startDate")]);

  const submitHandler = async (values: z.infer<typeof searchFormSchema>) => {
    setDelayedLoading(true);
    setTimeout(() => setDelayedLoading(false), 500);

    const url = new URL(window.location.href);
    url.searchParams.set("locationTo", String(values.locationTo));
    url.searchParams.set("locationFrom", String(values.locationFrom));
    url.searchParams.set("startDate", formatDateToYMD(values.startDate));
    url.searchParams.set("endDate", formatDateToYMD(values.endDate));
    url.searchParams.set("startTime", values.startTime); // Set start time in URL
    url.searchParams.set("endTime", values.endTime); // Set end time in URL

    window.history.pushState({}, "", url.toString());
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 7; hour <= 23; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      options.push({
        label: timeString,
        value: timeString,
      });
    }
    return options;
  };

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return null;
    // return (
    //   <components.DropdownIndicator {...props}>
    //     <HourIcon />
    //   </components.DropdownIndicator>
    // );
  };
  const HourSelect = (props: any) => <Select {...props} components={{ DropdownIndicator }} />;

  return (
    <section className="container mx-auto -mt-6 rounded-2xl bg-white px-4 py-2">
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 lg:grid-cols-12 md:grid-cols-2 gap-2">
          <div className="col-span-2 lg:col-span-2 sm:col-span-2">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">Pick-up location</p>
            <Select
              className=" h-[50px]"
              classNamePrefix="react-select"
              placeholder="Pick-up location"
              options={areas.map((area) => ({
                label: area.name,
                value: area.id,
              }))}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "var(--brand-base)",
                },
                borderRadius: 4,
              })}
              onChange={(value) => form.setValue("locationFrom", value?.value ?? 0)}
              value={{
                label: areas.find((area) => area.id === form.watch("locationFrom"))?.name,
                value: form.watch("locationFrom"),
              }}
            />
          </div>
          <div className="col-span-1 lg:col-span-2 sm:col-span-1">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">Pick-up date</p>
            <Controller
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  clearIcon={null}
                  calendarIcon={<CalendarIcon />}
                  className="w-full h-[50px]"
                  calendarProps={{
                    minDate: new Date(),
                  }}
                  onChange={(date) => form.setValue("startDate", date ? (date as Date) : new Date())}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="col-span-1 lg:col-span-1 sm:col-span-1">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">Time</p>
            <HourSelect
              aria-label="Start time"
              className="w-full h-[50px]"
              classNamePrefix="react-select"
              name="startTime"
              onChange={(value: HTMLSelectElement) => form.setValue("startTime", value?.value ?? "")}
              value={{
                label: form.watch("startTime"),
                value: form.watch("startTime"),
              }}
              options={generateTimeOptions()}
            />
          </div>
          <div className="col-span-2 lg:col-span-2 sm:col-span-2">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">Drop-off location</p>
            <Select
              className="w-full h-[50px]"
              classNamePrefix="react-select"
              placeholder="Drop-off location"
              options={areas.map((area) => ({
                label: area.name,
                value: area.id,
              }))}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "var(--brand-base)",
                },
                borderRadius: 4,
              })}
              onChange={(value) => form.setValue("locationTo", value?.value || 0)}
              value={{
                label: areas.find((area) => area.id === form.watch("locationTo"))?.name,
                value: form.watch("locationTo"),
              }}
            />
          </div>
          <div className="col-span-1 lg:col-span-2 sm:col-span-1">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">Drop-off date</p>
            <DatePicker
              className="w-full h-[50px]"
              clearIcon={null}
              calendarIcon={<Calendar11Icon />}
              calendarProps={{
                minDate: new Date((form.watch("startDate") ?? new Date()).getTime() + MIN_RENTAL_PERIOD * 24 * 60 * 60 * 1000),
                maxDate: new Date((form.watch("startDate") ?? new Date()).getTime() + 61 * 24 * 60 * 60 * 1000),
              }}
              onChange={(date) => form.setValue("endDate", date as Date)}
              value={form.watch("endDate")}
            />
          </div>
          <div className="col-span-1 lg:col-span-1 sm:col-span-1">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">Time</p>
            <HourSelect
              aria-label="End time"
              className="w-full h-[50px]"
              classNamePrefix="react-select"
              name="endTime"
              onChange={(value: HTMLSelectElement) => form.setValue("endTime", value?.value ?? "")}
              value={{
                label: form.watch("endTime"),
                value: form.watch("endTime"),
              }}
              options={generateTimeOptions()}
            />
          </div>
          <div className="col-span-2 lg:col-span-2 sm:col-span-2">
            <p className="text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">&nbsp;</p>
            <button type="submit" className="bg-brand-base text-white h-[50px] px-6 rounded-lg w-full">
              <div className="flex justify-center gap-2">
                <SearchIcon />
                {delayedLoading ? "Loading..." : "Search"}
              </div>
            </button>
          </div>
        </div>
      </form>

      <p className="mt-1 text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">
        Minimum rental period is ${MIN_RENTAL_PERIOD} days.
      </p>
    </section>
  );
};

export default dynamic(() => Promise.resolve(SearchForm2), { ssr: false });
