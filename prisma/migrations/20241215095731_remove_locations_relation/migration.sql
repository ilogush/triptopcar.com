-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "car_body_type" VARCHAR(50) NOT NULL,
    "price_per_day" INTEGER NOT NULL,
    "engine_capacity" VARCHAR(10),
    "fuel_type" VARCHAR(50) NOT NULL,
    "seats_quantity" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "transmission_type" VARCHAR(50) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "passport_number" VARCHAR(20),
    "phone_1" VARCHAR(20) NOT NULL,
    "phone_2" VARCHAR(20),
    "status" VARCHAR(10) NOT NULL,
    "location_id" INTEGER,
    "hotel_name" VARCHAR(100),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER,
    "car_id" INTEGER,
    "is_clean" BOOLEAN DEFAULT true,
    "rental_amount" DECIMAL(10,2) NOT NULL,
    "rental_currency" VARCHAR(3) DEFAULT 'USD',
    "deposit_amount" DECIMAL(10,2) NOT NULL,
    "deposit_currency" VARCHAR(3) NOT NULL,
    "pickup_location_id" INTEGER,
    "address_return" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "baby_chair" BOOLEAN NOT NULL DEFAULT false,
    "client_name" VARCHAR(100) NOT NULL,
    "client_passport_number" VARCHAR(50) NOT NULL,
    "client_phone_number" VARCHAR(20) NOT NULL,
    "client_second_phone_number" VARCHAR(20),
    "client_surname" VARCHAR(100) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "dropoff_address" VARCHAR(255) NOT NULL,
    "dropoff_location_id" INTEGER,
    "fuel" VARCHAR(50) NOT NULL,
    "full_insurance" BOOLEAN NOT NULL DEFAULT false,
    "location_return" VARCHAR(255) NOT NULL,
    "manager" VARCHAR(100) NOT NULL,
    "mileage_odo" INTEGER NOT NULL,
    "pickup_address" VARCHAR(255) NOT NULL,
    "rental_deposit_amount" DECIMAL(10,2) NOT NULL,
    "rental_deposit_currency" VARCHAR(3) DEFAULT 'USD',
    "time_return" TIMESTAMP(3),
    "car_brand" VARCHAR(100) NOT NULL,
    "car_model" VARCHAR(100) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "deliveryPrice" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "contract_id" INTEGER,
    "payment_type" VARCHAR(50) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) DEFAULT 'USD',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
