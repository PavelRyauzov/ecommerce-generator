-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "featuredById" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_featuredById_key" ON "image"("featuredById");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_featuredById_fkey" FOREIGN KEY ("featuredById") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
