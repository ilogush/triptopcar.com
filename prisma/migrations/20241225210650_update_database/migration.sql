-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ode" INTEGER,
ADD COLUMN     "oil_last_change" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "payment_sign" BOOLEAN NOT NULL DEFAULT true;
