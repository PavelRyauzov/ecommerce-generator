/*
  Warnings:

  - You are about to alter the column `amount` on the `price` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "price" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
