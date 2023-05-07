-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "moneyId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "moneyId" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    "characteristicId" INTEGER NOT NULL,
    "cartId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_moneyId_key" ON "Cart"("moneyId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_moneyId_key" ON "CartItem"("moneyId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_moneyId_fkey" FOREIGN KEY ("moneyId") REFERENCES "price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_moneyId_fkey" FOREIGN KEY ("moneyId") REFERENCES "price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "characteristic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
