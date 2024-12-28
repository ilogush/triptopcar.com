/*
  Warnings:

  - You are about to drop the column `amount` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "amount";

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
