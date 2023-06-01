/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `characteristic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "characteristic_externalId_key" ON "characteristic"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "collection_externalId_key" ON "collection"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "product_externalId_key" ON "product"("externalId");
