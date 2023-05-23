import { getCollectionProducts } from '@/lib/nestjs-server';

import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';

export const runtime = 'edge';

export default async function CategoryPage({ params }: { params: { collection: string } }) {
  const products = await getCollectionProducts(params.collection);

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
