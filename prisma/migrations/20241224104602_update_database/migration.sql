-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "manager_id" INTEGER;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
