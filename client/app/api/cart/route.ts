import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { addToCart, removeFromCart } from '@/lib/nestjs-server';

export async function POST(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { productId, characteristicId } = await req.json();

  if (!cartId?.length || !productId?.length) {
    return NextResponse.json({ error: 'Missing cartId or variantId' }, { status: 400 });
  }
  try {
    characteristicId
      ? await addToCart(cartId, [{ productId, characteristicId, quantity: 1 }])
      : await addToCart(cartId, [{ productId, quantity: 1 }]);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (e) {
      return NextResponse.json({ message: e });
    }

    return NextResponse.json({ status: 500 });
  }
}
//
// export async function PUT(req: NextRequest): Promise<Response> {
//   const cartId = cookies().get('cartId')?.value;
//   const { variantId, quantity, lineId } = await req.json();
//
//   if (!cartId || !variantId || !quantity || !lineId) {
//     return NextResponse.json(
//       { error: 'Missing cartId, variantId, lineId, or quantity' },
//       { status: 400 }
//     );
//   }
//   try {
//     await updateCart(cartId, [
//       {
//         id: lineId,
//         merchandiseId: variantId,
//         quantity
//       }
//     ]);
//     return NextResponse.json({ status: 204 });
//   } catch (e) {
//     if (e) {
//       return NextResponse.json({ message: e });
//     }
//
//     return NextResponse.json({ status: 500 });
//   }
// }
//
export async function DELETE(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { lineId } = await req.json();

  if (!cartId || !lineId) {
    return NextResponse.json({ error: 'Missing cartId or lineId' }, { status: 400 });
  }
  try {
    await removeFromCart(cartId, [lineId]);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (e) {
      return NextResponse.json({ message: e });
    }

    return NextResponse.json({ status: 500 });
  }
}
