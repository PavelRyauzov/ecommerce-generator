import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderDataInput, OrderLineInput } from '../graphql';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    return await this.prismaService.order.findUnique({
      where: {
        id: id,
      },
      include: {
        lines: true,
      },
    });
  }

  async create(dataInput: OrderDataInput, linesInputs: OrderLineInput[]) {
    const order = await this.prismaService.order.create({
      data: {
        ...dataInput,
      },
    });

    const updatedOrder = await this.addLines(order.id, linesInputs);

    return updatedOrder;
  }

  private async addLines(orderId: number, lines: OrderLineInput[]) {
    for (const line of lines) {
      const { productId, characteristicId, quantity } = line;

      const orderItem = await this.prismaService.orderItem.create({
        data: {
          quantity: quantity,
          product: {
            connect: { id: parseInt(productId) },
          },
          characteristic: characteristicId
            ? { connect: { id: parseInt(characteristicId) } }
            : {},
          order: {
            connect: { id: orderId },
          },
        },
      });
    }

    return await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        lines: true,
      },
    });
  }
}
