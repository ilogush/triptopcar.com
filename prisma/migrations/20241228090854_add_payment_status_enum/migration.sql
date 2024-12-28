-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('ACCEPTED', 'NOT_ACCEPTED');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'NOT_ACCEPTED';
