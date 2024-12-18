-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "status" "ContractStatus" NOT NULL DEFAULT 'PENDING';
