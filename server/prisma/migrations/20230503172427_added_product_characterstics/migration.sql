-- CreateTable
CREATE TABLE "characteristic" (
    "id" SERIAL NOT NULL,
    "availableForSale" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characteristic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "characteristic" ADD CONSTRAINT "characteristic_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
