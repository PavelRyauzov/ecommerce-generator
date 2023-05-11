import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Grid from '@/components/grid';
import Footer from '@/components/layout/footer';
import { AddToCart } from '@/components/product/add-to-cart';
import ProductGridItems from '@/components/layout/product-grid-items';
import { Gallery } from '@/components/product/gallery';
import { VariantSelector } from '@/components/product/variant-selector';
import Prose from '@/components/prose';
import { getProduct, getProductRecommendations } from '@/lib/nestjs-server';
import { Image } from '@/lib/nestjs-server/types';

export const runtime = 'edge';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

  return (
    <div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <Gallery
            title={product.title}
            amount={product.price.amount}
            currencyCode={product.price.currencyCode}
            images={product.images.map((image: Image) => ({
              src: process.env.SERVER_API_STATIC_FILES_URL + image.fileName,
              altText: image.altText
            }))}
          />
        </div>

        <div className="p-6 lg:col-span-2">
          {/* @ts-expect-error Server Component */}
          <VariantSelector characteristics={product.characteristics}/>

          {product.description ? (
            <Prose className="mb-6 text-sm leading-tight" html={product.description} />
          ) : null}

          <AddToCart variant={product} availableForSale={product.availableForSale} />
        </div>
      </div>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <RelatedProducts id={product.id} />
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <Footer />
        </Suspense>
      </Suspense>
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;

  return (
    <div className="px-4 py-8">
      <div className="mb-4 text-3xl font-bold">Related Products</div>
      <Grid className="grid-cols-2 lg:grid-cols-5">
        <ProductGridItems products={relatedProducts} />
      </Grid>
    </div>
  );
}
