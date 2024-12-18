"use client";

import { Car } from "@/app/(home)/_components/car-card";
import { areas } from "@/app/(home)/_data/areas.data";
import Loader from "@/components/icons/loader";
import { useBookCar } from "@/hooks/useTelegram";
import { useTotalPrice } from "@/hooks/useTotalPrice";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface BookCarProps {
  className?: string;
  car: Car;
}

interface Form {
  phone: string;
  fullName: string;
  comment: string;
  pickupLocation: string;
  dropoffLocation: string;
}

const BookCar: React.FC<BookCarProps> = ({ className, car }) => {
  const searchParams = useSearchParams();
  const timeStart = searchParams.get("timeStart") ?? "10:00";
  const timeEnd = searchParams.get("timeEnd") ?? "10:00";
  const locationFrom = areas.find(
    (area) => area.id === (Number(searchParams.get("locationFrom")) !== 0 ? Number(searchParams.get("locationFrom")) : 1),)?.name;
  const locationTo = areas.find(
    (area) => area.id === (Number(searchParams.get("locationTo")) !== 0 ? Number(searchParams.get("locationTo")) : 1),
  )?.name;
  const startDate =
    Number(searchParams.get("startDate")) !== 0 ? Number(searchParams.get("startDate")) : new Date().getTime();
  const endDate =
    Number(searchParams.get("endDate")) !== 0
      ? Number(searchParams.get("endDate"))
      : new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const daysQuantity = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const isPremium = searchParams.get("isPremium") === "true";
  const totalPrice = useTotalPrice({
    car,
    daysQuantity,
    isPremium,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    includeChildSeat: false,
    pickupLocationId: Number(searchParams.get("locationFrom")) || 1, // ID пункта выдачи
    dropoffLocationId: Number(searchParams.get("locationTo")) || 1, // ID пункта возврата
  });

  const { push } = useRouter();

  const { mutateAsync: createBooking, isPending, isSuccess } = useBookCar();
  const { register, handleSubmit } = useForm<Form>({
    shouldFocusError: true,
  });

  const submitHandler = async ({ fullName, phone, comment }: Form) => {
    if (fullName && phone && phone.startsWith("+") && phone.length >= 9) {
      createBooking(
        `Car Booking\n\n${car.brand} ${car.model} ${car.year}\nPick-up Location: ${
          locationFrom ?? "Not mentioned"
        } + 250฿ \nDrop-off Location: ${
          locationTo ?? "Not mentioned"
        } + 250฿\nStart: ${new Date(startDate).toLocaleDateString()} ${
          timeStart
        }\nFinish: ${new Date(endDate).toLocaleDateString()} ${
          timeEnd
        }\nTotal: ${totalPrice} ฿\nDeposit: ${car.deposit} ฿\nInsurance: ${
          isPremium ? "Full" : "Standart"
        }\n${fullName} ${phone}\n${comment}\n`,
      );
      push(
        `/checkout?carId=${car.id}&isPremium=${isPremium}&startDate=${startDate}&endDate=${endDate}&timeStart=${timeStart}&timeEnd=${timeEnd}&dropoffLocation=${locationTo}&pickupLocation=${locationFrom}&fullName=${fullName}&phone=${phone}`,
      );
    } else {
      toast.error("Please fill all the fields correctly.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Request sent successfully!");
    }
  }, [isSuccess]);

  return (
    <div className={clsx("bg-white rounded-lg flex flex-col items-start p-5", className)}>
      <h2 className="text-slate-700 text-2xl font-bold">User Information</h2>
      <form
        className="mt-4 w-full flex items-end gap-5 max-sm:flex-col justify-start"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col  w-full">
          <div className="flex flex-col items-start gap-2 w-full mb-[7px]">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-500">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="w-full h-[50px] border-[1px] rounded-sm pl-2"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="phone" className="text-sm font-medium  text-gray-500">
              Phone Number
            </label>
            <input
              id="phone"
              {...register("phone")}
              type="tel"
              className="w-full h-[50px] border-[1px] rounded-sm pl-2"
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="comment" className="text-sm font-medium  text-gray-500">
              Comments
            </label>
            <textarea
              id="comment"
              {...register("comment")}
              className="w-full border-[1px] rounded-sm pl-2"
            />
          </div>
          <div className="flex flex-col items-start w-[100%]">
            <button
              disabled={isPending}
              className="w-full h-12 bg-brand-base text-white rounded-lg mt-4 hover:border-brand-base hover:bg-white hover:text-brand-base duration-300 border-2 border-transparent hover:font-semibold flex items-center gap-4 justify-center"
            >
              Book now
              {isPending && <Loader className="animate-spin" />}
            </button>
          </div>
        </div>
      </form>
      <p className="mt-5 text-left">
        By proceeding, I acknowledge that I have read and agree to Ulethai`s{" "}
        <span className="text-brand-base">Terms and Conditions</span> and{" "}
        <span className="text-brand-base">Privacy Policy</span>
      </p>
    </div>
  );
};

export default dynamic(() => Promise.resolve(BookCar), { ssr: false });
