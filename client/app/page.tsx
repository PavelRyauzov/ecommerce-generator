import { ThreeItemGrid } from '@/components/grid/three-items';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export default async function HomePage() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ThreeItemGrid />
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
