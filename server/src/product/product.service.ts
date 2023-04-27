import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProduct } from '../graphql';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateProduct): Promise<Product> {
    const { collectionId, ...fields } = input;

    const product = await this.prismaService.product.create({
      data: {
        ...fields,
        collection: {
          connect: { id: parseInt(input.collectionId) },
        },
      },
    });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      include: { featuredImage: true, images: true, collection: true },
    });
    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = this.prismaService.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        collection: true,
      },
    });
    return product;
  }
}
