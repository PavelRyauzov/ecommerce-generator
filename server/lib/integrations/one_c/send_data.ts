import { PrismaService } from '../../../src/prisma.service';
import { FileService } from '../../../src/file/file.service';
import { MoneyService } from '../../../src/money/money.service';
import { ImageService } from '../../../src/image/image.service';
import { ProductService } from '../../../src/product/product.service';
import { CollectionService } from '../../../src/collection/collection.service';
import { CharacteristicService } from '../../../src/characteristic/characteristic.service';
import { oneCFetch } from './index';
import { OrderService } from '../../../src/order/order.service';

export class OneCDataSender {
  private prismaService = new PrismaService();
  private fileService = new FileService();
  private priceService = new MoneyService(this.prismaService);
  private imageService = new ImageService(this.prismaService, this.fileService);
  private productService = new ProductService(
    this.prismaService,
    this.priceService,
    this.imageService,
  );
  private collectionService = new CollectionService(this.prismaService);
  private characteristicService = new CharacteristicService(
    this.prismaService,
    this.priceService,
  );
  private orderService = new OrderService(this.prismaService);
  private moneyService = new MoneyService(this.prismaService);

  public async sendData() {
    const requestData = await this.getOrderDataFor1C(1);
    console.log('Sending data to 1C...');
    const response = await oneCFetch('orders/', 'POST', requestData);
    console.log('Data successful sending to 1C!');
  }

  private async getOrderDataFor1C(orderId: number) {
    const { id, lines } = await this.orderService.findById(orderId);

    const orderItems = [];
    for (const line of lines) {
      const { productId, characteristicId, quantity } = line;

      const { priceId } = characteristicId
        ? await this.characteristicService.findById(characteristicId)
        : await this.productService.findById(productId);

      const price = await this.moneyService.findById(priceId);

      const orderItemTotalAmount = {
        totalAmount: {
          amount: quantity * price.amount,
          currencyCode: price.currencyCode,
        },
      };

      const product = await this.productService.findById(productId);
      const characteristic = characteristicId
        ? await this.characteristicService.findById(characteristicId)
        : undefined;

      const orderItem = {
        ...line,
        ...orderItemTotalAmount,
        product: { ...product },
        characteristic: { ...characteristic },
      };

      orderItems.push(orderItem);
    }

    const totalQuantity = orderItems.reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    );
    const orderTotalAmountValue = orderItems.reduce(
      (acc, curr) => acc + curr.totalAmount.amount,
      0,
    );
    const orderTotalAmountCurrencyCode = orderItems.reduce(
      (acc, curr) => curr.totalAmount.currencyCode,
      0,
    );

    const orderTotalAmount = {
      totalAmount: {
        amount: orderTotalAmountValue,
        currencyCode: orderTotalAmountCurrencyCode,
      },
    };

    return {
      id,
      lines: orderItems,
      totalQuantity,
      ...orderTotalAmount,
    };
  }
}

const dataLoader = new OneCDataSender();
dataLoader.sendData();
