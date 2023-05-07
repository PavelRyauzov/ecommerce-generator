import { ImageService } from './image.service';
import { PrismaService } from '../prisma.service';
import { FileService } from '../file/file.service';
import { ProductService } from '../product/product.service';
import { CollectionService } from '../collection/collection.service';
import { CreateCollectionDto } from '../collection/dto/create-collection.dto';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { CreateImageWithProductDto } from '../product/dto/create-image-wth-product.dto';
import { CreateCharacteristicDto } from '../characteristic/dto/create-characteristic.dto';
import { CharacteristicService } from '../characteristic/characteristic.service';
import { MoneyService } from '../money/money.service';
import { CreateMoneyDto } from '../money/dto/create-money.dto';

const prismaService = new PrismaService();
const fileService = new FileService();
const priceService = new MoneyService(prismaService);
const imageService = new ImageService(prismaService, fileService);
const productService = new ProductService(
  prismaService,
  priceService,
  imageService,
);
const collectionService = new CollectionService(prismaService);
const characterService = new CharacteristicService(prismaService, priceService);

export class TestImage {
  async collectionCreate(dto: CreateCollectionDto) {
    const collection = await collectionService.create({
      ...dto,
    });
  }

  async productCreate(
    productDto: CreateProductDto,
    priceDto: CreateMoneyDto,
    imageDtos: CreateImageWithProductDto[],
  ) {
    const product = await productService.create(
      productDto,
      priceDto,
      imageDtos,
    );
  }

  async charaterCreate(
    characterDto: CreateCharacteristicDto,
    priceDto: CreateMoneyDto,
  ) {
    const character = await characterService.create(characterDto, priceDto);
  }

  async test2() {
    const products = await prismaService.product.findMany({
      include: { images: true },
    });

    console.log(products);
  }
}

const test = new TestImage();

// test.collectionCreate({
//   title: 'Mobile phones',
// });

test.charaterCreate(
  {
    availableForSale: true,
    title: 'White',
    productId: 3,
  },
  {
    amount: 85000,
    currencyCode: 'RUB',
  },
);

// test.productCreate(
//   {
//     availableForSale: true,
//     title: 'iPhone 11',
//     description: 'apple mobile phone',
//     collectionId: 1,
//   },
//   {
//     amount: 60000,
//     currencyCode: 'RUB',
//   },
//   [
//     {
//       isFeature: true,
//       altText: 'iphone11-1',
//       base64: '',
//     },
//     {
//       altText: 'iphone11-2',
//       base64: '',
//     },
//     {
//       altText: 'iphone11-3',
//       base64: '',
//     },
//   ],
// );

// test.productCreate(
//   {
//     availableForSale: true,
//     title: 'iPhone 12',
//     description: 'apple mobile phone model 12',
//     collectionId: 1,
//   },
//   {
//     amount: 70000,
//     currencyCode: 'RUB',
//   },
//   [
//     {
//       isFeature: true,
//       altText: 'iphone12-1',
//       base64: '',
//     },
//     {
//       altText: 'iphone12-2',
//       base64: '',
//     },
//     {
//       altText: 'iphone12-3',
//       base64: '',
//     },
//   ],
// );

// test.productCreate(
//   {
//     availableForSale: true,
//     title: 'iPhone 13',
//     description: 'apple mobile phone model 13',
//     collectionId: 1,
//   },
//   {
//     amount: 80000,
//     currencyCode: 'RUB',
//   },
//   [
//     {
//       isFeature: true,
//       altText: 'iphone13-1',
//       base64: '',
//     },
//     {
//       altText: 'iphone13-2',
//       base64: '',
//     },
//     {
//       altText: 'iphone13-3',
//       base64: '',
//     },
//   ],
// );
