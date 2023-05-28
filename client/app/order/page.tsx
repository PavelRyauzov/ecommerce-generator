import { cookies } from 'next/headers';
import { getCart } from '@/lib/nestjs-server';
import Order from '@/components/order';

export default async function OrderPage() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <Order cart={cart} />;
}