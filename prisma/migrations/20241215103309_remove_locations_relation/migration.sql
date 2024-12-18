/*
  Warnings:

  - You are about to drop the column `baby_chair` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `car_brand` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `car_model` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `fuel` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "baby_chair",
DROP COLUMN "car_brand",
DROP COLUMN "car_model",
DROP COLUMN "fuel";
