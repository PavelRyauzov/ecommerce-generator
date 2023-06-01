import { PrismaService } from '../../src/prisma.service';
import { FileService } from '../../src/file/file.service';
import { MoneyService } from '../../src/money/money.service';
import { ImageService } from '../../src/image/image.service';
import { ProductService } from '../../src/product/product.service';
import { CollectionService } from '../../src/collection/collection.service';
import { CharacteristicService } from '../../src/characteristic/characteristic.service';
import { rawLoader } from '../../raw-loader';

export class Seeder {
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

  public async seed() {
    // seed collections
    const mobilePhones = await this.collectionService.create({
      title: 'Mobile phones',
    });
    const computers = await this.collectionService.create({
      title: 'Computers',
    });
    const tvs = await this.collectionService.create({
      title: 'TVs',
    });

    // seed products
    // mobile_phones
    const iphone13ImageOne = rawLoader(
      './base64_images/mobile_phones/iphone13_1.txt',
    );
    const iphone13ImageTwo = rawLoader(
      './base64_images/mobile_phones/iphone13_2.txt',
    );
    const iphone13ImageThree = rawLoader(
      './base64_images/mobile_phones/iphone13_3.txt',
    );
    const iphone13 = await this.productService.create(
      false,
      {
        availableForSale: true,
        title: 'iPhone 13',
        description: 'apple mobile phone model 13',
        collectionId: mobilePhones.id,
      },
      {
        amount: 80000,
        currencyCode: 'RUB',
      },
      [
        {
          isFeature: true,
          altText: 'iphone13-1',
          base64: iphone13ImageOne,
        },
        {
          altText: 'iphone13-2',
          base64: iphone13ImageTwo,
        },
        {
          altText: 'iphone13-3',
          base64: iphone13ImageThree,
        },
      ],
    );

    const iphone12ImageOne = rawLoader(
      './base64_images/mobile_phones/iphone12_1.txt',
    );
    const iphone12ImageTwo = rawLoader(
      './base64_images/mobile_phones/iphone12_2.txt',
    );
    const iphone12 = await this.productService.create(
      false,
      {
        availableForSale: false,
        title: 'iPhone 12',
        description: 'apple mobile phone model 12',
        collectionId: mobilePhones.id,
      },
      {
        amount: 60000,
        currencyCode: 'RUB',
      },
      [
        {
          isFeature: true,
          altText: 'iphone12-1',
          base64: iphone12ImageOne,
        },
        {
          altText: 'iphone12-2',
          base64: iphone12ImageTwo,
        },
      ],
    );

    const iphone11ImageOne = rawLoader(
      './base64_images/mobile_phones/iphone11_1.txt',
    );
    const iphone11 = await this.productService.create(
      false,
      {
        availableForSale: true,
        title: 'iPhone 11',
        description: 'apple mobile phone model 11',
        collectionId: mobilePhones.id,
      },
      {
        amount: 40000,
        currencyCode: 'RUB',
      },
      [
        {
          isFeature: true,
          altText: 'iphone11-1',
          base64: iphone11ImageOne,
        },
      ],
    );

    // computers
    const macbookAir13ImageOne = rawLoader(
      './base64_images/computers/macbookAir13_1.txt',
    );
    const macbookAir13ImageTwo = rawLoader(
      './base64_images/computers/macbookAir13_2.txt',
    );
    const macbookAir13ImageThree = rawLoader(
      './base64_images/computers/macbookAir13_3.txt',
    );
    const macbookAir13 = await this.productService.create(
      false,
      {
        availableForSale: true,
        title: 'MacBook Air 13',
        description: 'apple laptop air 13',
        collectionId: computers.id,
      },
      {
        amount: 100000,
        currencyCode: 'RUB',
      },
      [
        {
          isFeature: true,
          altText: 'macbook-air-13-1',
          base64: macbookAir13ImageOne,
        },
        {
          altText: 'macbook-air-13-2',
          base64: macbookAir13ImageTwo,
        },
        {
          altText: 'macbook-air-13-3',
          base64: macbookAir13ImageThree,
        },
      ],
    );

    const macbookPro14ImageOne = rawLoader(
      './base64_images/computers/macbookPro14_1.txt',
    );
    const macbookPro14ImageTwo = rawLoader(
      './base64_images/computers/macbookPro14_2.txt',
    );
    const macbookPro14 = await this.productService.create(
      false,
      {
        availableForSale: true,
        title: 'MacBook Pro 14',
        description: 'apple laptop pro 14',
        collectionId: computers.id,
      },
      {
        amount: 140000,
        currencyCode: 'RUB',
      },
      [
        {
          isFeature: true,
          altText: 'macbook-pro-14-1',
          base64: macbookPro14ImageOne,
        },
        {
          altText: 'macbook-pro-14-2',
          base64: macbookPro14ImageTwo,
        },
      ],
    );

    // tvs
    const samsungTvImageOne = rawLoader('./base64_images/tvs/samsung_tv_1.txt');
    const samsungTv = await this.productService.create(
      false,
      {
        availableForSale: true,
        title: 'Samsung TV',
        description: 'samsung tv',
        collectionId: tvs.id,
      },
      {
        amount: 100000,
        currencyCode: 'RUB',
      },
      [
        {
          isFeature: true,
          altText: 'samsung_tv-1',
          base64: samsungTvImageOne,
        },
      ],
    );

    // seed characteristics
    const iphone13White = await this.characteristicService.create(
      {
        availableForSale: true,
        title: 'White',
        productId: iphone13.id,
      },
      {
        amount: 85000,
        currencyCode: 'RUB',
      },
    );
    const iphone13Black = await this.characteristicService.create(
      {
        availableForSale: false,
        title: 'Black',
        productId: iphone13.id,
      },
      {
        amount: 80000,
        currencyCode: 'RUB',
      },
    );
    const iphone13Blue = await this.characteristicService.create(
      {
        availableForSale: true,
        title: 'Blue',
        productId: iphone13.id,
      },
      {
        amount: 82000,
        currencyCode: 'RUB',
      },
    );

    const iphone12White = await this.characteristicService.create(
      {
        availableForSale: true,
        title: 'White',
        productId: iphone12.id,
      },
      {
        amount: 65000,
        currencyCode: 'RUB',
      },
    );
    const iphone12Black = await this.characteristicService.create(
      {
        availableForSale: true,
        title: 'Black',
        productId: iphone12.id,
      },
      {
        amount: 60000,
        currencyCode: 'RUB',
      },
    );
    const iphone12Blue = await this.characteristicService.create(
      {
        availableForSale: true,
        title: 'Blue',
        productId: iphone12.id,
      },
      {
        amount: 62000,
        currencyCode: 'RUB',
      },
    );

    const macbookAir13_16gb = await this.characteristicService.create(
      {
        availableForSale: true,
        title: '16gb',
        productId: macbookAir13.id,
      },
      {
        amount: 120000,
        currencyCode: 'RUB',
      },
    );
    const macbookAir13_8gb = await this.characteristicService.create(
      {
        availableForSale: true,
        title: '8gb',
        productId: macbookAir13.id,
      },
      {
        amount: 100000,
        currencyCode: 'RUB',
      },
    );

    const macbookPro14_16gb = await this.characteristicService.create(
      {
        availableForSale: true,
        title: '16gb',
        productId: macbookPro14.id,
      },
      {
        amount: 140000,
        currencyCode: 'RUB',
      },
    );
    const macbookPro14_32gb = await this.characteristicService.create(
      {
        availableForSale: true,
        title: '32gb',
        productId: macbookPro14.id,
      },
      {
        amount: 160000,
        currencyCode: 'RUB',
      },
    );
  }
}

const seeder = new Seeder();
seeder.seed();
console.log('Seed data import is successful!');
