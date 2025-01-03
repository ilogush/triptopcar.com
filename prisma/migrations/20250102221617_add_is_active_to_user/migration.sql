/*
  Warnings:

  - The `oil_last_change` column on the `cars` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "oil_last_change",
ADD COLUMN     "oil_last_change" INTEGER;
