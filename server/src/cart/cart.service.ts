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
        moneyId: null,
      },
      include: {
        lines: {
          include: {
            product: {
              include: {
                featuredImage: true,
              },
            },
          },
        },
        totalAmount: true,
      },
    });

    if (!inputs || inputs.length === 0) {
      return cart;
    }

    const updatedCart = this.addLines(cart.id, inputs);

    return updatedCart;
  }

  async addLines(cartId: number, lines: CartLineInput[]): Promise<Cart> {
    const createdCartItems = [];

    for (const line of lines) {
      const { productId, characteristicId, quantity } = line;

      const { priceId } = characteristicId
        ? await this.characteristicService.findById(parseInt(characteristicId))
        : await this.productService.findById(parseInt(productId));

      const price = await this.moneyService.findById(priceId);

      const totalAmount = await this.moneyService.create({
        amount: quantity * price.amount,
        currencyCode: price.currencyCode,
      });

      const cartItem = await this.prismaService.cartItem.create({
        data: {
          quantity: quantity,
          totalAmount: {
            connect: { id: totalAmount.id },
          },
          product: {
            connect: { id: parseInt(productId) },
          },
          characteristic: characteristicId
            ? { connect: { id: parseInt(characteristicId) } }
            : {},
          cart: {
            connect: { id: cartId },
          },
        },
        include: { totalAmount: true },
      });

      createdCartItems.push(cartItem);
    }

    const totalQuantity = lines.reduce((acc, curr) => acc + curr.quantity, 0);
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
        id: cartId,
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
      include: {
        lines: true,
        totalAmount: true,
      },
    });

    return updatedCart;
  }

  async findById(id: number): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        id: id,
      },
      include: {
        lines: {
          include: {
            product: {
              include: {
                featuredImage: true,
              },
            },
            totalAmount: true,
          },
        },
        totalAmount: true,
      },
    });

    return cart;
  }
}
