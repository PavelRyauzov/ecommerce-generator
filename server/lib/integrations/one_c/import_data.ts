import { PrismaService } from '../../../src/prisma.service';
import { FileService } from '../../../src/file/file.service';
import { MoneyService } from '../../../src/money/money.service';
import { ImageService } from '../../../src/image/image.service';
import { ProductService } from '../../../src/product/product.service';
import { CollectionService } from '../../../src/collection/collection.service';
import { CharacteristicService } from '../../../src/characteristic/characteristic.service';
import { oneCFetch } from './index';

interface Collection {
  external_id: string;
  title: string;
}

interface Product {
  external_id: string;
  title: string;
  availableForSale: boolean;
  price?: Price;
  images: Image[];
  external_collection_id: string;
}

interface Price {
  amount: number;
  currencyCode: string;
}

interface Image {
  format: string;
  base64: string;
}

interface Characteristic {
  external_id: string;
  external_product_id: string;
  title: string;
  price?: Price;
}

interface FullData {
  collections: Collection[];
  products: Product[];
  characteristics: Characteristic[];
}

export class OneCDataLoader {
  private prismaService = new PrismaService();
  private fileService = new FileService();
  private priceService = new MoneyService(this.prismaService);
  private imageService = new ImageService(this.prismaService, this.fileService);
  private productService = new ProductService(
    this.prismaService,
    this.priceService,
    this.imageService,
  );
  private collectionService = new CollectionService(this.prismaService);
  private characteristicService = new CharacteristicService(
    this.prismaService,
    this.priceService,
  );

  public async loadAndImportData() {
    console.log('Fetching data...');
    const response = await oneCFetch('products/', 'GET');
    console.log('Fetching successful!');

    const { collections, products, characteristics }: FullData =
      response as FullData;

    console.log('Save data to db...');
    // save collections to db
    for (const collection of collections) {
      try {
        await this.collectionService.create({
          title: collection.title,
          externalId: collection.external_id,
        });
      } catch (error) {
        if (error.code === 'P2002') {
          // continue process
        }
      }
    }

    // save products to db
    for (const product of products) {
      try {
        if (product.images.length === 0) {
          continue;
        }

        const arrImages = [];
        for (const image of product.images) {
          const curImage = {
            isFeature: true,
            altText: product.title,
            base64: image.base64,
          };
          arrImages.push(curImage);
        }

        const collection = await this.collectionService.findByExternalId(
          product.external_collection_id,
        );

        let price;
        if (!Object.keys(product.price).length) {
          price = { amount: 1, currencyCode: 'RUB' };
        } else {
          price = product.price;
        }

        await this.productService.create(
          true,
          {
            availableForSale: product.availableForSale,
            title: product.title,
            description: product.title,
            collectionId: collection.id,
            externalId: product.external_id,
          },
          price,
          arrImages,
        );
      } catch (error) {
        if (error.code === 'P2002') {
          // continue process
        }
      }
    }

    // save characteristic to db
    for (const characteristic of characteristics) {
      try {
        const product = await this.productService.findByExternalId(
          characteristic.external_product_id,
        );

        let price;
        if (!Object.keys(characteristic.price).length) {
          price = { amount: 1, currencyCode: 'RUB' };
        } else {
          price = characteristic.price;
        }

        await this.characteristicService.create(
          {
            availableForSale: true,
            title: characteristic.title,
            productId: product.id,
            externalId: characteristic.external_id,
          },
          price,
        );
      } catch (error) {
        if (error.code === 'P2002') {
          // continue process
        }
      }
    }
    console.log('Data is saved in database!');
  }
}

const dataLoader = new OneCDataLoader();
dataLoader.loadAndImportData();
