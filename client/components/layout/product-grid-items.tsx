import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import { Product } from '@/lib/nestjs-server/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="h-full w-full" href={`/product/${product.id}`}>
            <GridTileImage
              alt={product.title}
              labels={{
                isSmall: true,
                title: product.title,
                amount: product.price.amount,
                currencyCode: product.price.currencyCode
              }}
              src={process.env.SERVER_API_STATIC_FILES_URL + '/' + product.featuredImage.fileName}
              width={600}
              height={600}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
