"use client";

import Loader from "@/components/icons/loader";
import { useBookCar } from "@/hooks/useTelegram";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatDateToYMD, useCriteriaParams } from "@/lib/price";

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

const BookCar: FC<BookCarProps> = ({ className, car }) => {
  const criteria = useCriteriaParams();

  const startDate = criteria.startDate;
  const endDate = criteria.endDate;

  const locationFromId = criteria.locationFromId;
  const locationToId = criteria.locationToId;

  const startTime = criteria.startTime;
  const endTime = criteria.endTime;

  const isPremium = criteria.isPremium;

  const totalPrice = criteria.totalPriceByCar(car);
  const pickupPrice = criteria.pickupPrice();
  const dropoffPrice = criteria.dropoffPrice();

  const { push } = useRouter();

  const { mutateAsync: createBooking, isPending, isSuccess } = useBookCar();
  const { register, handleSubmit } = useForm<Form>({
    shouldFocusError: true,
  });

  const submitHandler = async ({ fullName, phone, comment }: Form) => {
    if (fullName && phone && phone.startsWith("+") && phone.length >= 9) {
      createBooking(
        `Car Booking
${car.name} ${car.year}
Pick-up Location: ${criteria.locationFromName ?? "Not mentioned"} + ${pickupPrice}฿
Drop-off Location: ${criteria.locationToName ?? "Not mentioned"} + ${dropoffPrice}฿
Start: ${formatDateToYMD(startDate)}: ${startTime}
Finish: ${formatDateToYMD(endDate)}: ${endTime}
Total: ${totalPrice} ฿\nDeposit: ${car.deposit} ฿
Insurance: ${isPremium ? "Full" : "Standard"}
${fullName} ${phone}
${comment}
`,
      );

      // Why?
      push(
        `/checkout?carId=${car.id}&isPremium=${isPremium}&startDate=${formatDateToYMD(startDate)}&endDate=${formatDateToYMD(endDate)}&timeStart=${startTime}&timeEnd=${endTime}&dropoffLocation=${locationToId}&pickupLocation=${locationFromId}&fullName=${fullName}&phone=${phone}`,
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
