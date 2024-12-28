/*
  Warnings:

  - You are about to drop the column `number` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "number",
ADD COLUMN     "car_number" TEXT NOT NULL DEFAULT '';
