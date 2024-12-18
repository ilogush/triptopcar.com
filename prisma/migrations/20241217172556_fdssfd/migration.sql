/*
  Warnings:

  - You are about to drop the column `deliveryPrice` on the `location` table. All the data in the column will be lost.
  - Added the required column `deliveryprice` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "deliveryPrice",
ADD COLUMN     "deliveryprice" INTEGER NOT NULL;
