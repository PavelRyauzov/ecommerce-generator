import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Collection } from '@prisma/client';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCollectionDto): Promise<Collection> {
    const collection = await this.prismaService.collection.create({
      data: dto,
    });
    return collection;
  }

  async findAll(): Promise<Collection[]> {
    const collections = await this.prismaService.collection.findMany({
      include: {
        products: {
          include: {
            featuredImage: true,
            images: true,
            price: true,
            characteristics: {
              include: {
                price: true,
              },
            },
          },
        },
      },
    });
    return collections;
  }

  async findById(id: number): Promise<Collection> {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: id,
      },
      include: {
        products: {
          include: {
            featuredImage: true,
            images: true,
            price: true,
            characteristics: {
              include: {
                price: true,
              },
            },
          },
        },
      },
    });
    return collection;
  }
}
