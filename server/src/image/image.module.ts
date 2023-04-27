import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { PrismaService } from '../prisma.service';
import { FileService } from '../file/file.service';
import { ImageResolver } from './image.resolver';

@Module({
  providers: [PrismaService, ImageService, FileService, ImageResolver],
})
export class ImageModule {}
