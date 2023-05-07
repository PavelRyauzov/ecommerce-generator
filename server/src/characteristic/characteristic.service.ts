import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Characteristic } from '@prisma/client';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { CreateMoneyDto } from '../money/dto/create-money.dto';
import { MoneyService } from '../money/money.service';

@Injectable()
export class CharacteristicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly moneyService: MoneyService,
  ) {}

  async create(
    characteristicDto: CreateCharacteristicDto,
    priceDto: CreateMoneyDto,
  ): Promise<Characteristic> {
    const price = await this.moneyService.create(priceDto);

    const { productId, ...fields } = characteristicDto;

    const characteristic = await this.prismaService.characteristic.create({
      data: {
        ...fields,
        product: {
          connect: { id: productId },
        },
        price: {
          connect: { id: price.id },
        },
      },
    });
    return characteristic;
  }

  async findAll(): Promise<Characteristic[]> {
    const characteristics = await this.prismaService.characteristic.findMany({
      include: {
        price: true,
      },
    });
    return characteristics;
  }

  async findById(id: number): Promise<Characteristic> {
    const characteristic = await this.prismaService.characteristic.findUnique({
      where: {
        id: id,
      },
      include: {
        price: true,
      },
    });
    return characteristic;
  }
}
