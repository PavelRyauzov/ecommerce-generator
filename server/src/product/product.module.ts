import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma.service';
import { ImageModule } from '../image/image.module';
import { PriceModule } from '../price/price.module';

@Module({
  imports: [PriceModule, ImageModule],
  providers: [PrismaService, ProductService, ProductResolver],
})
export class ProductModule {}
