/*
  Warnings:

  - A unique constraint covering the columns `[priceId]` on the table `characteristic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priceId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "characteristic" ADD COLUMN     "priceId" INTEGER;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "priceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "characteristic_priceId_key" ON "characteristic"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "product_priceId_key" ON "product"("priceId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characteristic" ADD CONSTRAINT "characteristic_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE SET NULL ON UPDATE CASCADE;
