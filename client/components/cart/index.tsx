import { createCart, getCart } from '@/lib/nestjs-server';
import { cookies } from 'next/headers';
import CartButton from './button';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cartIdUpdated = false;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartIdUpdated = true;
  }

  return <CartButton cart={cart} cartIdUpdated={cartIdUpdated} />;
}
