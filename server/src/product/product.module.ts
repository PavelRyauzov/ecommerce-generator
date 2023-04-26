import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, ProductService, ProductResolver],
})
export class ProductModule {}
