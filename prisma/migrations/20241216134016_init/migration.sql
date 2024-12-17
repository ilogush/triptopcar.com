/*
  Warnings:

  - Made the column `client_id` on table `contracts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contract_id` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_client_id_fkey";

-- AlterTable
ALTER TABLE "contracts" ALTER COLUMN "client_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "contract_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
