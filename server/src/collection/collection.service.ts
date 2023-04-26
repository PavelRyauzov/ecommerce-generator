import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Collection } from '@prisma/client';
import { CreateCollection } from '../graphql';

@Injectable()
export class CollectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateCollection): Promise<Collection> {
    const collection = await this.prismaService.collection.create({
      data: input,
    });
    return collection;
  }

  async findAll(): Promise<Collection[]> {
    const collections = await this.prismaService.collection.findMany({
      include: { products: true },
    });
    return collections;
  }

  async findById(id: string): Promise<Collection> {
    const collection = this.prismaService.collection.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        products: true,
      },
    });
    return collection;
  }
}
