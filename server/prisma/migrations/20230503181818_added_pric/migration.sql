/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "price" (
    "id" SERIAL NOT NULL,
    "amount" BIGINT NOT NULL,
    "currencyCode" TEXT NOT NULL DEFAULT 'RUB',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_pkey" PRIMARY KEY ("id")
);
