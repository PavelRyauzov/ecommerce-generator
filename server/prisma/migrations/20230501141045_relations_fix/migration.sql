/*
  Warnings:

  - You are about to drop the column `featuredById` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[featuredImageId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_featuredById_fkey";

-- DropIndex
DROP INDEX "image_featuredById_key";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "featuredById";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "featuredImageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "product_featuredImageId_key" ON "product"("featuredImageId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
