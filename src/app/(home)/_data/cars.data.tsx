import { Car } from "@/typing/interfaces";

export const cars: Car[] = [
  {
    id: 1,
    imageUrl: "/toyota-fortuner.png",
    name: "Toyota Fortuner",
    carBodyType: "SUV",
    pricePerDay: 2000,
    engineCapacity: 2.4,
    fuelType: "Diesel",
    seatsQuantity: 7,  //fdf
    deposit: 15000,
    year: 2023,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Fortuner is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Fortuner! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    imageUrl: "/toyota-yaris-ativ.png",
    name: "Toyota Yaris Ativ",
    carBodyType: "Sedan",
    pricePerDay: 750,
    engineCapacity: 1.2,
    year: 2023,
    deposit: 6000,
    fuelType: "Gasoline A95",
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Yaris Ativ is a gem for traveling around Phuket! We rented this hatchback for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 4,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Yaris Ativ! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 3,
    imageUrl: "/toyota-veloz.png",
    name: "Toyota Veloz",
    carBodyType: "Van",
    pricePerDay: 950,
    engineCapacity: 1.5,
    year: 2023,
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 7,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    imageUrl: "/chevrolet-captiva.png",
    name: "Chevrolet Captiva",
    carBodyType: "SUV",
    pricePerDay: 850,
    engineCapacity: 1.5,
    year: 2020,
    fuelType: "Gasoline A95",
    deposit: 6000,
    seatsQuantity: 4,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
      {
    id: 5,
    imageUrl: "/mazda-cx30.png",
    name: "Mazda CX-30",
    carBodyType: "SUV",
    pricePerDay: 1200,
    engineCapacity: 2.0,
    year: 2023,
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
    {
    id: 6,
    imageUrl: "/toyota-fortuner.png",
    name: "Toyota Fortuner",
    carBodyType: "SUV",
    pricePerDay: 1700,
    engineCapacity: 2.4,
    fuelType: "Diesel",
    seatsQuantity: 7,
    deposit: 10000, 
    year: 2023,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Fortuner is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Fortuner! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
    
];
