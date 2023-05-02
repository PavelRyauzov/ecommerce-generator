import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { PrismaService } from '../prisma.service';
import { ImageResolver } from './image.resolver';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  providers: [PrismaService, ImageService, ImageResolver],
  exports: [ImageService],
})
export class ImageModule {}
