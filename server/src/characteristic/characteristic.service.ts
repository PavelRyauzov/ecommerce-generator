import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Characteristic, Product } from '@prisma/client';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';

@Injectable()
export class CharacteristicService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCharacteristicDto): Promise<Characteristic> {
    const { productId, ...fields } = dto;

    const characteristic = await this.prismaService.characteristic.create({
      data: {
        ...fields,
        product: {
          connect: { id: productId },
        },
      },
    });
    return characteristic;
  }

  async findAll(): Promise<Characteristic[]> {
    const characteristics = await this.prismaService.characteristic.findMany();
    return characteristics;
  }

  async findById(id: number): Promise<Characteristic> {
    const characteristic = await this.prismaService.characteristic.findUnique({
      where: {
        id: id,
      },
    });
    return characteristic;
  }
}
