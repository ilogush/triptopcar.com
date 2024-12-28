/*
  Warnings:

  - Added the required column `color` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "color" VARCHAR(20) NOT NULL,
ADD COLUMN     "number" VARCHAR(20) NOT NULL;
