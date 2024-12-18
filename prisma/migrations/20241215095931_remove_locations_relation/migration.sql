/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "deliveryPrice" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);
