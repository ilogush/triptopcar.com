/*
  Warnings:

  - You are about to drop the column `deposit_amount` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `is_clean` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "deposit_amount",
DROP COLUMN "is_clean";
