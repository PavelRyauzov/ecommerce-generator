import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cart } from '@prisma/client';
import { CartLineInput } from '../graphql';
import { MoneyService } from '../money/money.service';
import { ProductService } from '../product/product.service';
import { CharacteristicService } from '../characteristic/characteristic.service';

@Injectable()
export class CartService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly moneyService: MoneyService,
    private readonly productService: ProductService,
    private readonly characteristicService: CharacteristicService,
  ) {}

  async create(inputs: CartLineInput[]): Promise<Cart> {
    const cart = await this.prismaService.cart.create({
      data: {
        lines: null,
      },
    });

    const createdCartItems = [];

    for (const input of inputs) {
      const hasCharacteristic = Boolean(input.characteristicId);
      const { priceId } = hasCharacteristic
        ? await this.characteristicService.findById(input.characteristicId)
        : await this.productService.findById(input.productId);

      const price = await this.moneyService.findById(priceId);

      const totalAmount = await this.moneyService.create({
        amount: input.quantity * price.amount,
        currencyCode: price.currencyCode,
      });

      const cartItem = await this.prismaService.cartItem.create({
        data: {
          quantity: input.quantity,
          totalAmount: {
            connect: { id: totalAmount.id },
          },
          product: {
            connect: { id: input.productId },
          },
          characteristic: hasCharacteristic
            ? { connect: { id: input.characteristicId } }
            : null,
          cart: {
            connect: { id: cart.id },
          },
        },
      });

      createdCartItems.push(cartItem);
    }

    const totalQuantity = inputs.reduce((acc, curr) => acc + curr.quantity, 0);
    const cartTotalAmountValue = createdCartItems.reduce(
      (acc, curr) => acc + curr.totalAmount.amount,
      0,
    );

    const cartTotalAmount = await this.moneyService.create({
      amount: cartTotalAmountValue,
      currencyCode: 'RUB',
    });

    const updatedCart = await this.prismaService.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        lines: {
          connect: createdCartItems.map((cartItem) => ({ id: cartItem.id })),
        },
        totalQuantity: totalQuantity,
        totalAmount: {
          connect: { id: cartTotalAmount.id },
        },
      },
    });

    return cart;
  }

  async findById(id: number): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        id: id,
      },
    });
    return cart;
  }
}
