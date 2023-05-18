/*
  Warnings:

  - You are about to drop the column `moneyId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuantity` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `moneyId` on the `cart_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_moneyId_fkey";

-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_moneyId_fkey";

-- DropIndex
DROP INDEX "cart_moneyId_key";

-- DropIndex
DROP INDEX "cart_item_moneyId_key";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "moneyId",
DROP COLUMN "totalQuantity";

-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "moneyId";
