import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Image, Product } from '@prisma/client';
import { join } from 'path';
import { CreateImageDto } from './dto/create-image.dto';
import { FileService } from '../file/file.service';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  private readonly destDir = join(__dirname, '../..', 'public/static');

  async create(base64: string, dto: CreateImageDto): Promise<Image> {
    try {
      const filePath = await this.fileService.createFileFromBase64(
        base64,
        this.destDir,
      );
      const fileName = path.basename(filePath);

      const image = await this.prismaService.image.create({
        data: {
          fileName: fileName,
          ...dto,
        },
      });
      return image;
    } catch (e) {
      console.log(`Error creating file: ${e}`);
    }
  }

  async findAll(): Promise<Image[]> {
    const images = await this.prismaService.image.findMany({});
    return images;
  }

  async findById(id: string): Promise<Image> {
    const image = this.prismaService.image.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return image;
  }
}
