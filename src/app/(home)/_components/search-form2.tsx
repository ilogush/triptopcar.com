"use client";

import { FC, useEffect } from "react";
import DatePicker from "react-date-picker";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CalendarIcon from "@/components/icons/calendar-days-icon";
import Calendar11Icon from "@/components/icons/calendar-days11-icon";
import Select, { DropdownIndicatorProps } from "react-select";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { areas } from "../_data/areas.data";

const searchFormSchema = z.object({
  locationTo: z.number(),
  locationFrom: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

const SearchForm2: FC = () => {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      locationTo: 1,
      locationFrom: 1,
      startDate: new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(Number(searchParams.get("endDate")))
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      startTime: "10:00",
      endTime: "10:00",
    },
  });

  useEffect(() => {
    form.reset({
      locationTo: Number(searchParams.get("locationTo")) || 1,
      locationFrom: Number(searchParams.get("locationFrom")) || 1,
      startDate: searchParams.get("startDate") ? new Date(Number(searchParams.get("startDate"))) : new Date(),
      endDate: searchParams.get("endDate")
        ? new Date(Number(searchParams.get("endDate")))
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      startTime: searchParams.get("startTime") || "10:00", // Reset start time
      endTime: searchParams.get("endTime") || "10:00", // Reset end time
    });
  }, [searchParams, form]);

  useEffect(() => {
    const currentEndDate = form.getValues("endDate");
    const newEndDate = new Date(form.watch("startDate").getTime() + 3 * 24 * 60 * 60 * 1000);
    if (currentEndDate < newEndDate) {
      form.setValue("endDate", newEndDate);
    }
  }, [form.watch("startDate")]);

  const submitHandler = async (values: z.infer<typeof searchFormSchema>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("locationTo", String(values.locationTo));
    url.searchParams.set("locationFrom", String(values.locationFrom));
    url.searchParams.set("startDate", String(values.startDate.getTime()));
    url.searchParams.set("endDate", String(values.endDate.getTime()));
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
    <section className="container mx-auto -mt-6 rounded-2xl bg-white p-4">
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 lg:grid-cols-12 md:grid-cols-2 gap-2">
          <div className="col-span-2 lg:col-span-2 sm:col-span-2">
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
            <DatePicker
              className="w-full h-[50px]"
              clearIcon={null}
              calendarIcon={<Calendar11Icon />}
              calendarProps={{
                minDate: new Date((form.watch("startDate") ?? new Date()).getTime() + 3 * 24 * 60 * 60 * 1000),
                maxDate: new Date((form.watch("startDate") ?? new Date()).getTime() + 61 * 24 * 60 * 60 * 1000),
              }}
              onChange={(date) => form.setValue("endDate", date as Date)}
              value={form.watch("endDate")}
            />
          </div>
          <div className="col-span-1 lg:col-span-1 sm:col-span-1">
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
            <button type="submit" className="bg-brand-base text-white h-[50px] px-6 rounded-lg w-full">
              Search
            </button>
          </div>
        </div>
      </form>

      <p className="mt-1 text-[0.675rem] sm:text-[0.775rem] leading-[1.25rem] text-gray-500">
        The minimum rental period is 3 days.
      </p>
    </section>
  );
};

export default dynamic(() => Promise.resolve(SearchForm2), { ssr: false });
