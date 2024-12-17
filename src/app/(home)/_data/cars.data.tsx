import { Car } from "@/typing/interfaces";

export const cars: Car[] = [
  {
    id: 1,
    imageUrl: "/honda_jazz.png",
    name: "Honda Jazz",
    carBodyType: "Hatchback",
    pricePerDay: 650,
    engineCapacity: "1.0 Turbo",
    fuelType: "Gasoline A95",
    seatsQuantity: 4,
    deposit: 6000,
    year: "2023",
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "I recently rented a Honda Jazz for my trip to Phuket, and I couldn't be happier with my choice. The car was in excellent condition, clean, and well-maintained. It handled beautifully on the winding roads and offered great fuel efficiency, which was a big plus for our long drives across the island.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "The rental process was smooth and hassle-free. The staff were friendly, professional, and very helpful in providing all the necessary information. They even gave us some great tips on places to visit and the best routes to take.",
        rating: 5,
      },
      {
        id: 3,
        name: "Stephen Hendry",
        review:
          "The Honda Jazz itself was the perfect size for our needs. It comfortably accommodated all our luggage and provided a smooth and comfortable ride for both city driving and exploring the more remote parts of Phuket.",
        rating: 5,
      },
      {
        id: 4,
        name: "Mandy Henry",
        review:
          "Rented a new Honda Jazz hatchback at the beginning of December, overall I highly recommend renting one to anyone visiting Phuket. It made our trip incredibly convenient and enjoyable. Will definitely choose this service again for future trips!",
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    imageUrl: "/honda_city_hatchback.png",
    name: "Honda City",
    carBodyType: "Hatchback",
    pricePerDay: 750,
    engineCapacity: "1.0 Turbo",
    fuelType: "Gasoline A95",
    year: "2024",
    deposit: 6000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Smith",
        review:
          "Honda city hatchback is much more than it may seem at first glance. This car brightened up our vacation in Phuket, we were able to get to the most remote sights of Thailand on our own. I recommend taking this car in a new body.",
        rating: 5,
      },
      {
        id: 2,
        name: "Christopher",
        review:
          "Fresh car with minimum mileage of 3800 km. It is always pleasant to get into the car...",
        rating: 5,
      },
      {
        id: 3,
        name: "Christopher",
        review:
          "Great staff at the car rental company were polite to us and other peopleThat our flight was delayed for several hours. The rental office is located near the International Airport Phuket within walking distance which was quite convenient. Thank you for the prompt service.",
        rating: 5,
      },
    ],
  },
  {
    id: 3,
    imageUrl: "/honda_city.png",
    name: "Honda City",
    carBodyType: "Sedan",
    pricePerDay: 750,
    engineCapacity: "1.0 Turbo",
    fuelType: "Gasoline A95",
    year: "2024",
    deposit: 6000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Smith",
        review:
          "The body of the Honda city sedan is much more successful than its previous model and better than a similar model in terms of cost Toyota Yaris Afiv. If available, choose Honda, 100% you will not be mistaken.",
        rating: 5,
      },
      {
        id: 2,
        name: "Christopher",
        review:
          "We did not have a transfer to the hotel and we decided to get there ourselves by rented car. We chose the company closest to the Phuket airport and we were not mistaken. The car was new with transit plates, according to the owner, it was bought only a few months ago, which could not pleasantly surprise us. Thanks to the rented car, we received exceptionally pleasant emotions from the ride, although the first few hours it was not easy to navigate the local traffic.",
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    imageUrl: "/honda_civic.png",
    name: "Honda Civic",
    carBodyType: "Sedan",
    pricePerDay: 1150,
    engineCapacity: "2.0 Hybrid",
    year: "2024",
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Smith",
        review:
          "A gorgeous Honda Civic in a new body. Excellent interior and dynamics. Traveling around Thailand. Thanks to this car, we were never bored.",
        rating: 5,
      },
      {
        id: 2,
        name: "Christopher",
        review:
          "I have always liked cars from the Japanese company Honda. The Civic in a new body exceeded all my expectations - it is a very dynamic, lively car, thanks to the hybrid technology, gasoline consumption was minimal. I am glad that in this company almost all the cars are new and in good condition. I recommend!",
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    imageUrl: "/toyota-yaris_ativ.png",
    name: "Toyota Yaris Ativ",
    carBodyType: "Sedan",
    pricePerDay: 725,
    engineCapacity: "1.2",
    year: "2023",
    deposit: 6000,
    fuelType: "Gasoline A95",
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Donald B.",
        review:
          "We rented the most affordable car available for our dates Toyota Yaris Ativ. Its was good car, the only thing on the mountain trails was the lack of a 1.2 liter engine.",
        rating: 4,
      },
      {
        id: 2,
        name: "Emely Hernandez",
        review:
          "We were thrilled with the Toyota Yaris Ativ! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
    {
    id: 6,
    imageUrl: "/toyota_vios.png",
    name: "Toyota Vios",
    carBodyType: "Sedan",
    pricePerDay: 650,
    engineCapacity: "1.5",
    year: "2022",
    fuelType: "Gasoline A95",
    deposit: 5000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Semen A.",
        review:
          "Despite its age, it was a good, well-maintained car that was technically looked after, and it never let us down on our trip to Koh Phangan. We were able to enjoy driving the Toyota Vios and enjoy the sights of Thailand to the fullest.",
        rating: 5,
      },
      {
        id: 2,
        name: "Victor Shinko",
        review:
          "The best car for little money with an engine capacity of 1.5 liters for this money is currently available. I recommend choosing this one for rent.",
        rating: 5,
      },
    ],
  },
    {
    id: 7,
    imageUrl: "/toyota_veloz.png",
    name: "Toyota Veloz",
    carBodyType: "Van",
    pricePerDay: 950,
    engineCapacity: "1.5",
    year: "2023",
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 7,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Anderson Grich",
        review:
          "I rented a Toyota Vios for my stay in Phuket and it was fantastic. The car was beautiful, reliable and very economical. The rental and return process was quick and smooth, with helpful staff guiding me through it. Highly recommended!",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "Renting a Toyota Vios in Phuket was a fantastic decision. The car was reliable, comfortable, and perfect for exploring the island. The rental process was smooth and easy, and the staff were very friendly.",
        rating: 5,
      },
    ],
  },
      {
    id: 8,
    imageUrl: "/mazda_2.png",
    name: "Mazda 2",
    carBodyType: "Sedan",
    pricePerDay: 650,
    engineCapacity: "1.2",
    year: "2023",
    fuelType: "Gasoline A95",
    deposit: 5000,
    seatsQuantity: 4,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Michael",
        review:
          "I booked Mazda 2 four months in advance through the website, To get an additional discount on pre-booking. I received the car at Phuket airportIn accordance withAbuseThe same class and model, Color. I can't imagineHolidays in Phuket without a car anymore. Now I will alwaysRent a car, it's very convenient and you can visitSave money on taxis many different places and attractions in Thailand. I recommend everyone to rent cars, it's very convenient and fastFor little money.",
        rating: 5,
      },
      {
        id: 2,
        name: "James",
        review:
          "I rented a car for two weeks upon arrival right at the Phuket airport. I returned it there to a friendly employee of the company. The only thing I didn't see in the rental conditions was a payment for a car wash of 400 baht at the end of the rental period, since the car was quite dirty after two weeks of use. Otherwise, everything went smoothly and quite easily. Next time I will contact the same company.",
        rating: 5,
      },
    ],
  },
    {
    id: 9,
    imageUrl: "/toyota_yaris_cross.png",
    name: "Toyota Yaris Cros",
    carBodyType: "SUV",
    pricePerDay: 1250,
    engineCapacity: "1.5 Hybrid",
    year: "2024",
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "William",
        review:
          "This wonderful little crossover car turned out to be a very economical assistant on our trip. During the valuable month, it took us to the most remote corners of Thailand. We were very pleased with our decision to rent a Toyota Yaris Atif. I recommend choosing it!",
        rating: 5,
      },
      {
        id: 2,
        name: "Johnson",
        review:
          "Compact Micros er is a great optionFor its money. Thanks to hybrid technology, this car consumed less than 5 liters per 100 km. We really liked it. Next time we will choose a car.",
        rating: 5,
      },
    ],
  },

  {
    id: 10,
    imageUrl: "/chevrolet-captiva.png",
    name: "Chevrolet Captiva",
    carBodyType: "SUV",
    pricePerDay: 850,
    engineCapacity: "1.5",
    year: "2020",
    fuelType: "Gasoline A95",
    deposit: 6000,
    seatsQuantity: 4,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Daniel",
        review:
          "A large, spacious car with a huge luggage compartment. If you are traveling with children, I recommend using our recommendation and paying attention to the Chevrolet Captiva. This car helped us brighten up a rainy weekend in Phuket.",
        rating: 5,
      },
      {
        id: 2,
        name: "Matthew",
        review:
          "Chevrolet Captiva turned out to be much larger than I had previously thought. There is a lot of space in the cabin and we, five adults, were not cramped or uncomfortable during long trips around Thailand. Thanks to this crossover, we were able to visit a large number of Phuket attractions on our own and not pay money to an agent. I recommend taking a car because without it, it will be very difficult in Phuket.",
        rating: 5,
      },
    ],
  },
  {
    id: 11,
    imageUrl: "/mazda_cx30.png",
    name: "Mazda CX30",
    carBodyType: "SUV",
    pricePerDay: 1200,
    engineCapacity: "2.0",
    year: "2024",
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Andrew",
        review:
          "The Mazda CX 30 turned out to be very elegant in my wife's opinion. The only thing is that when the car was left in an open parking lot without a canopy, the sun's rays penetrated into the interior and heated the leather seats. When getting into the car, it was uncomfortable at first because the seats were quite hot for my body. Rather, this is a disadvantage of Thailand, not a specific car. In all other respects, the car rental went smoothly, the car was delivered on time, clean, with a full tank.",
        rating: 5,
      },
      {
        id: 2,
        name: "Joshua",
        review:
          "The car was in excellent technical condition, clean and well-maintained. Thanks to being careful everywhere and paying attention on the roads, we managed to return the car without incidents in its original condition. Thanks to the company for its trust and attention to customers.",
        rating: 5,
      },
    ],
  },
  {
    id: 12,
    imageUrl: "/toyota_fortuner.png",
    name: "Toyota Fortuner",
    carBodyType: "SUV",
    pricePerDay: 1500,
    engineCapacity: "2.4",
    fuelType: "Diesel",
    seatsQuantity: 7,
    deposit: 10000,
    year: "2023",
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "David Sarokovich",
        review:
          "Toyota Fortuner is the most powerful car from diesel SUVs in this company. There was a large company of us and we did not even consider other rental options, since we visit Thailand every year and already had experience renting other models of cars. I recommend everyone who wants a powerful car to choose and specifically Toyota Fortuner.",
        rating: 5,
      },
      {
        id: 2,
        name: "Robert V.",
        review:
          "We had to rent a Toyota Fortuner and for the locationVilla on a steep hill.Some taxis in the daughterCould not afford to go up our steep hill and bring us to what was quite uncomfortable.Toyota Fortuner coped with this task perfectly and we are grateful to the service for its prompt work and delivery of the car despite the late hour. Thank you very much!",
        rating: 5,
      },
    ],
  },
      {
    id: 13,
    imageUrl: "/bmw_530e.png",
    name: "BMW 530E",
    carBodyType: "Sedan",
    pricePerDay: 7500,
    engineCapacity: "3.0 Hybrid",
    fuelType: "Gasoline A95",
    seatsQuantity: 5,
    deposit: 40000,
    year: "2023",
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "Joseph",
        review:
          "I am used to driving my favorite brand of car, BMW, and I am glad that I can afford to rent it in Thailand, although it is quite an expensive pleasure due to high government taxes.",
        rating: 5,
      },
      {
        id: 2,
        name: "Robert",
        review:
          "We had to rent a Toyota Fortuner and for the locationVilla on a steep hill.Some taxis in the daughterCould not afford to go up our steep hill and bring us to what was quite uncomfortable.Toyota Fortuner coped with this task perfectly and we are grateful to the service for its prompt work and delivery of the car despite the late hour. Thank you very much!",
        rating: 5,
      },
    ],
  },
  {
    id: 14,
    imageUrl: "/bmw_x5.png",
    name: "BMW X5",
    carBodyType: "SUV",
    pricePerDay: 13000,
    engineCapacity: "4.5 Hybrid",
    fuelType: "Gasoline A95",
    seatsQuantity: 7,
    deposit: 10000,
    year: "2023",
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "David Sarokovich",
        review:
          "Toyota Fortuner is the most powerful car from diesel SUVs in this company. There was a large company of us and we did not even consider other rental options, since we visit Thailand every year and already had experience renting other models of cars. I recommend everyone who wants a powerful car to choose and specifically Toyota Fortuner.",
        rating: 5,
      },
      {
        id: 2,
        name: "Robert V.",
        review:
          "We had to rent a Toyota Fortuner and for the locationVilla on a steep hill.Some taxis in the daughterCould not afford to go up our steep hill and bring us to what was quite uncomfortable.Toyota Fortuner coped with this task perfectly and we are grateful to the service for its prompt work and delivery of the car despite the late hour. Thank you very much!",
        rating: 5,
      },
    ],
  },
];
