"use client";
import StarIcon from "@/components/icons/star";
import StarFullIcon from "@/components/icons/star-full";
import UserBestIcon from "@/components/icons/user-icon";
import clsx from "clsx";
import { Review } from "../page";


interface ReviewsProps {
  className?: string;
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ className, reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className={clsx("bg-white p-5 rounded-lg flex flex-col items-center", className)}>
        <p className="text-gray-600">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className={clsx("bg-white p-5 rounded-lg flex flex-col items-start gap-10", className)}>
      {reviews.map((review) => (
        <ReviewBlock review={review} key={review.id} />
      ))}
    </div>
  );
};

const ReviewBlock = ({ review }: { review: Review }) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-brand-base flex items-center justify-center p-2">
          <UserBestIcon className="text-white w-7 h-7" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                {review.rating && review.rating > index ? <StarFullIcon className="w-5 h-5" /> : <StarIcon className="w-5 h-5" />}
              </span>
            ))}
            <h3 className="ml-3 font-bold">{review.name}</h3>
          </div>
          <p className="pl-10 text-gray-600 max-sm:pl-0">{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
