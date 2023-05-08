import { createCart, getCart } from '@/lib/nestjs-server';
import { cookies } from 'next/headers';
import CartButton from './button';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cartIdUpdated = false;
  let cart;

  console.log('CART!!!!!!!!!!!, ', cartId);

  if (cartId) {
    cart = await getCart(cartId);
  }

  // If the `cartId` from the cookie is not set or the cart is empty
  // (old carts becomes `null` when you checkout), then get a new `cartId`
  //  and re-fetch the cart.
  if (!cartId || !cart) {
    cart = await createCart();
    cartIdUpdated = true;
    console.dir(cart);
  }

  return <CartButton cart={cart} cartIdUpdated={cartIdUpdated} />;
}
