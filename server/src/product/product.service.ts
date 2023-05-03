import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageService } from '../image/image.service';
import { CreateImageWithProductDto } from './dto/create-image-wth-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imageService: ImageService,
  ) {}

  async create(
    productDto: CreateProductDto,
    imageDtos?: CreateImageWithProductDto[] | null,
  ): Promise<Product> {
    const { collectionId, ...fields } = productDto;

    let product = await this.prismaService.product.create({
      data: {
        ...fields,
        collection: {
          connect: { id: collectionId },
        },
      },
    });

    if (imageDtos && imageDtos.length > 0) {
      for (const imageDto of imageDtos) {
        const { isFeature, ...fields } = imageDto;
        const image = await this.imageService.create({
          ...fields,
          productId: product.id,
        });
        if (isFeature) {
          product = await this.setFeaturedImage(product.id, image.id);
        }
      }
    }
    return product;
  }

  private async setFeaturedImage(
    productId: number,
    imageId: number,
  ): Promise<Product> {
    const image = this.imageService.findById(imageId);
    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found`);
    }

    const product = this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: {
        featuredImage: {
          connect: {
            id: imageId,
          },
        },
      },
    });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      include: { images: true, featuredImage: true, characteristics: true },
    });
    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
      include: { images: true, featuredImage: true, characteristics: true },
    });
    return product;
  }
}
