import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Money } from '@prisma/client';
import { CreateMoneyDto } from './dto/create-money.dto';

@Injectable()
export class MoneyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateMoneyDto): Promise<Money> {
    const money = await this.prismaService.money.create({
      data: dto,
    });
    return money;
  }

  async findAll(): Promise<Money[]> {
    const monies = await this.prismaService.money.findMany();
    return monies;
  }

  async findById(id: number): Promise<Money> {
    const money = await this.prismaService.money.findUnique({
      where: {
        id: id,
      },
    });
    return money;
  }
}
