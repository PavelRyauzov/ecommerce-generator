/*
  Warnings:

  - You are about to drop the `price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_moneyId_fkey";

-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_moneyId_fkey";

-- DropForeignKey
ALTER TABLE "characteristic" DROP CONSTRAINT "characteristic_priceId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_priceId_fkey";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "totalQuantity" DROP NOT NULL,
ALTER COLUMN "moneyId" DROP NOT NULL;

-- DropTable
DROP TABLE "price";

-- CreateTable
CREATE TABLE "money" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyCode" TEXT NOT NULL DEFAULT 'RUB',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "money_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "money"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characteristic" ADD CONSTRAINT "characteristic_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "money"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_moneyId_fkey" FOREIGN KEY ("moneyId") REFERENCES "money"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_moneyId_fkey" FOREIGN KEY ("moneyId") REFERENCES "money"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
