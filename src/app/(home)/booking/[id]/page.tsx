"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import CarCard from "./_components/car-card";
import Reviews from "./_components/reviews";
import BookingSidebar from "./_components/sidebar";
import { Car } from "../../_components/car-card";

export interface Review {
  id: number;
  name: string;
  review: string;
  rating: number | null;
  created_at: string;
}

// Define a type for the expected params
interface Params {
  id: string;
}

export default function BookingId({ params }: { params: Params }) {
  const [id, setId] = useState<number | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const idNumber = Number(params.id); // Convert the ID to number
    setId(idNumber); // Set the id state
  }, [params]);

  useEffect(() => {
    if (id === null) return; // Wait until id is resolved

    const fetchData = async () => {
      setLoading(true);
      try {
        const carRes = await fetch(`/api/cars/${id}`);
        if (!carRes.ok) throw new Error("Failed to fetch car");

        const carData = await carRes.json();
        setCar(carData);

        const reviewsRes = await fetch(`/api/reviews?car_id=${id}`);
        if (!reviewsRes.ok) throw new Error("Failed to fetch reviews");

        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) notFound();

  return (
    <section className="container mx-auto mb-4 mt-8 flex gap-4 min-h-[70vh] max-lg:flex-col max-sm:px-4">
      <main className="flex basis-3/4 max-xl:basis-2/3 flex-col gap-4 h-full">
        <CarCard car={car} />
        <Reviews reviews={reviews} />
      </main>
      <BookingSidebar car={car} className="basis-1/4 max-xl:basis-1/3" />
    </section>
  );
}
