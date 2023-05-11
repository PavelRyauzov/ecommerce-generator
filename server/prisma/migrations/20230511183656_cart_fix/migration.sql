-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_characteristicId_fkey";

-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "characteristicId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "characteristic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
