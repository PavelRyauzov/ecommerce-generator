import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageService } from '../image/image.service';
import { CreateImageWithProductDto } from './dto/create-image-wth-product.dto';
import { CreateMoneyDto } from '../money/dto/create-money.dto';
import { MoneyService } from '../money/money.service';

const productIncludeOptions = {
  include: {
    images: true,
    featuredImage: true,
    characteristics: {
      include: {
        price: true,
      },
    },
    price: true,
  },
};

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly moneyService: MoneyService,
    private readonly imageService: ImageService,
  ) {}

  private sorting = [
    { sortKey: 'RELEVANCE' },
    { sortKey: 'CREATED_AT' },
    { sortKey: 'PRICE' },
  ];

  async create(
    from1CFlag: boolean,
    productDto: CreateProductDto,
    priceDto: CreateMoneyDto,
    imageDtos?: CreateImageWithProductDto[] | null,
  ): Promise<Product> {
    const price = await this.moneyService.create(priceDto);

    const { collectionId, ...fields } = productDto;

    let product = await this.prismaService.product.create({
      data: {
        ...fields,
        collection: {
          connect: { id: collectionId },
        },
        price: {
          connect: { id: price.id },
        },
      },
    });

    if (imageDtos && imageDtos.length > 0) {
      for (const imageDto of imageDtos) {
        const { isFeature, ...fields } = imageDto;
        const image = await this.imageService.create(
          {
            ...fields,
            productId: product.id,
          },
          from1CFlag,
        );
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

  async findForDemonstration(): Promise<Product[]> {
    const collections = await this.prismaService.collection.findMany({
      take: 3,
    });

    if (!collections) {
      throw new HttpException(
        'Collections not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const products = await Promise.all(
      collections.map(async (collection) => {
        return await this.prismaService.product.findFirst({
          where: {
            collectionId: collection.id,
          },
          ...productIncludeOptions,
        });
      }),
    );

    if (products.length === 0) {
      throw new HttpException(
        'Products not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
      ...productIncludeOptions,
    });
    return product;
  }

  async findByExternalId(externalId: string): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: {
        externalId: externalId,
      },
    });
    return product;
  }

  async findSimilar(id: number): Promise<Product[]> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
    });

    const products = await this.prismaService.product.findMany({
      where: {
        collectionId: product.collectionId,
        NOT: {
          id: product.id,
        },
      },
      ...productIncludeOptions,
      take: 10,
    });
    return products;
  }

  async findByParams(
    sortKey: string,
    reverse: boolean,
    query: string,
    first: number,
    offset: number,
  ): Promise<Product[]> {
    if (!this.sorting.some((item) => item.sortKey === sortKey)) {
      throw new HttpException(
        'Incorrect sorting key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const searchOptions = {
      where: {
        title: {
          search:
            query === '' ? undefined : query.replace(/[^a-zA-Z0-9/"\s]/g, ''),
        },
      },
    };

    switch (sortKey) {
      case 'CREATED_AT':
        return await this.prismaService.product.findMany({
          ...searchOptions,
          orderBy: {
            createdAt: reverse ? 'desc' : 'asc',
          },
          ...productIncludeOptions,
          take: first,
          skip: offset,
        });
      case 'PRICE':
        return await this.prismaService.product.findMany({
          ...searchOptions,
          orderBy: {
            price: {
              amount: reverse ? 'desc' : 'asc',
            },
          },
          ...productIncludeOptions,
          take: first,
          skip: offset,
        });
      case 'RELEVANCE':
        return await this.prismaService.product.findMany({
          ...searchOptions,
          ...productIncludeOptions,
          take: first,
          skip: offset,
        });
    }
  }
}
