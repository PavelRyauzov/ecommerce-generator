import { NextRequest, NextResponse } from 'next/server';

import { createOrder } from '@/lib/nestjs-server';

export async function POST(req: NextRequest): Promise<Response> {
  const { orderData, lines } = await req.json();

  if (!orderData || !lines) {
    return NextResponse.json({ error: 'Order data error' }, { status: 400 });
  }

  try {
    await createOrder(orderData, lines);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (e) {
      return NextResponse.json({ message: e });
    }

    return NextResponse.json({ status: 500 });
  }
}
