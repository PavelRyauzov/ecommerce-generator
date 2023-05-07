import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma.service';
import { ImageModule } from '../image/image.module';
import { MoneyModule } from '../money/money.module';

@Module({
  imports: [MoneyModule, ImageModule],
  providers: [PrismaService, ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
