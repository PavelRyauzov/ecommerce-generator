import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Characteristic } from '@prisma/client';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { CreatePriceDto } from '../price/dto/create-price.dto';
import { PriceService } from '../price/price.service';

@Injectable()
export class CharacteristicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly priceService: PriceService,
  ) {}

  async create(
    characteristicDto: CreateCharacteristicDto,
    priceDto: CreatePriceDto,
  ): Promise<Characteristic> {
    const price = await this.priceService.create(priceDto);

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
