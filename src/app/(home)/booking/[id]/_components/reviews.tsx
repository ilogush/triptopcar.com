"use client";
import StarIcon from "@/components/icons/star";
import StarFullIcon from "@/components/icons/star-full";
import UserBestIcon from "@/components/icons/user-icon";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import React from "react";
import { Accordion } from "flowbite-react";

interface ReviewsProps {
  className?: string;
  car: Car;
}

const Reviews: React.FC<ReviewsProps> = ({ className, car }) => {
  if (!car.reviews) {
    return null;
  }

  return (
    <>
      <div className={clsx("bg-white p-4 rounded-lg", className)}>
        <Accordion>
          {car.reviews.map((review) => {
            return (
              <Accordion.Panel key={review.id}>
                <Accordion.Title>
                  <div className="flex items-center gap-1">
                    <h3 className="pr-4">{review.name}</h3>
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {review.rating > index ? (
                          <StarFullIcon className="w-5 h-5" />
                        ) : (
                          <StarIcon className="w-5 h-5" />
                        )}
                      </span>
                    ))}
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-brand-base flex items-center justify-center p-2">
                      <UserBestIcon className="text-white w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <p className="pl-14 text-gray-600 max-sm:pl-0">{review.review}</p>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default Reviews;
