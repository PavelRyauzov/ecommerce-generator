import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CartLineInput, CartLineUpdateInput } from '../graphql';
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

  async create(inputs: CartLineInput[]) {
    const cart = await this.prismaService.cart.create({
      data: {},
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
      },
    });

    if (!inputs || inputs.length === 0) {
      return await this.getCartForClient(cart.id);
    }

    const updatedCart = this.addLines(cart.id, inputs);

    return updatedCart;
  }

  private async getCartForClient(cartId: number) {
    const { id, lines } = await this.prismaService.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        lines: {
          include: {
            product: {
              include: {
                featuredImage: true,
              },
            },
            characteristic: true,
          },
        },
      },
    });

    if (lines) {
      const cartItems = [];
      for (const line of lines) {
        const { productId, characteristicId, quantity } = line;

        const { priceId } = characteristicId
          ? await this.characteristicService.findById(characteristicId)
          : await this.productService.findById(productId);

        const price = await this.moneyService.findById(priceId);

        const cartItemTotalAmount = {
          totalAmount: {
            amount: quantity * price.amount,
            currencyCode: price.currencyCode,
          },
        };

        const cartItem = {
          ...line,
          ...cartItemTotalAmount,
        };

        cartItems.push(cartItem);
      }

      const totalQuantity = cartItems.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
      const cartTotalAmountValue = cartItems.reduce(
        (acc, curr) => acc + curr.totalAmount.amount,
        0,
      );
      const cartTotalAmountCurrencyCode = cartItems.reduce(
        (acc, curr) => curr.totalAmount.currencyCode,
        0,
      );

      const cartTotalAmount = {
        totalAmount: {
          amount: cartTotalAmountValue,
          currencyCode: cartTotalAmountCurrencyCode,
        },
      };

      return {
        id,
        lines: cartItems,
        totalQuantity,
        ...cartTotalAmount,
      };
    }

    return {
      id,
      lines: null,
      totalQuantity: null,
      totalAmount: null,
    };
  }

  async addLines(cartId: number, lines: CartLineInput[]) {
    const createdOrUpdatesCartItems = [];

    for (const line of lines) {
      const { productId, characteristicId, quantity } = line;

      const optionalCartItem = characteristicId
        ? await this.prismaService.cartItem.findFirst({
            where: {
              cartId: cartId,
              productId: parseInt(productId),
              characteristicId: parseInt(characteristicId),
            },
          })
        : await this.prismaService.cartItem.findFirst({
            where: {
              cartId: cartId,
              productId: parseInt(productId),
            },
          });

      if (optionalCartItem) {
        const cartItem = await this.prismaService.cartItem.update({
          where: {
            id: optionalCartItem.id,
          },
          data: {
            quantity: {
              increment: quantity,
            },
          },
        });
        createdOrUpdatesCartItems.push(cartItem);
      } else {
        const cartItem = await this.prismaService.cartItem.create({
          data: {
            quantity: quantity,
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
        });

        createdOrUpdatesCartItems.push(cartItem);
      }
    }

    const updatedCart = await this.prismaService.cart.update({
      where: {
        id: cartId,
      },
      data: {
        lines: {
          connect: createdOrUpdatesCartItems.map((cartItem) => ({
            id: cartItem.id,
          })),
        },
      },
      include: {
        lines: true,
      },
    });

    return await this.getCartForClient(cartId);
  }

  async removeLines(cartId: number, lineIds: string[]) {
    for (const lineId of lineIds) {
      const cartItem = await this.prismaService.cartItem.delete({
        where: {
          id: parseInt(lineId),
        },
      });
    }
    return await this.getCartForClient(cartId);
  }

  async updateLines(cartId: number, lines: CartLineUpdateInput[]) {
    for (const line of lines) {
      const { id, productId, characteristicId, quantity } = line;

      const optionalCartItem = characteristicId
        ? await this.prismaService.cartItem.findFirst({
            where: {
              cartId: cartId,
              productId: parseInt(productId),
              characteristicId: parseInt(characteristicId),
            },
          })
        : await this.prismaService.cartItem.findFirst({
            where: {
              cartId: cartId,
              productId: parseInt(productId),
            },
          });

      if (optionalCartItem) {
        const updatedCartItem = characteristicId
          ? await this.prismaService.cartItem.update({
              where: {
                id: parseInt(id),
              },
              data: {
                productId: parseInt(productId),
                characteristicId: parseInt(characteristicId),
                quantity: quantity,
              },
            })
          : await this.prismaService.cartItem.update({
              where: {
                id: parseInt(id),
              },
              data: {
                productId: parseInt(productId),
                quantity: quantity,
              },
            });
      }
    }

    return await this.getCartForClient(cartId);
  }

  async findById(id: number) {
    return await this.getCartForClient(id);
  }
}
