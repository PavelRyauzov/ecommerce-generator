import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Price } from '@prisma/client';
import { CreatePriceDto } from './dto/create-price.dto';

@Injectable()
export class PriceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePriceDto): Promise<Price> {
    const price = await this.prismaService.price.create({
      data: dto,
    });
    return price;
  }

  async findAll(): Promise<Price[]> {
    const prices = await this.prismaService.price.findMany();
    return prices;
  }

  async findById(id: number): Promise<Price> {
    const price = await this.prismaService.price.findUnique({
      where: {
        id: id,
      },
    });
    return price;
  }
}
