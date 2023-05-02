import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/nestjs-server';


export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return (
    <div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <Gallery
            title={product.title}
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            images={product.images.map((image: Image) => ({
              src: image.url,
              altText: image.altText
            }))}
          />
        </div>

        <div className="p-6 lg:col-span-2">
          {/* @ts-expect-error Server Component */}
          < VariantSelector options={product.options} variants={product.variants} />

          {product.descriptionHtml ? (
            <Prose className="mb-6 text-sm leading-tight" html={product.descriptionHtml} />
          ) : null}

          <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
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

