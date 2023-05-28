import { Suspense } from 'react';

export default function OrderLayout({ children }: { children: React.ReactNode }) {

  return (
    <Suspense>
      <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row">
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
      </div>
    </Suspense>
  );
}
