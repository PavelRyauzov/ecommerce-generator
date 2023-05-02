import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma.service';
import { ImageService } from '../image/image.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule],
  providers: [PrismaService, ProductService, ProductResolver],
})
export class ProductModule {}
