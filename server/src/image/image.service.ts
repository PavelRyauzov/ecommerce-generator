import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Image } from '@prisma/client';
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

  async create(dto: CreateImageDto, from1CFlag: boolean): Promise<Image> {
    try {
      const { productId, base64, ...fields } = dto;

      const filePath = await this.fileService.createFileFromBase64(
        base64,
        this.destDir,
        from1CFlag,
      );

      const fileName = path.basename(filePath);

      const image = await this.prismaService.image.create({
        data: {
          fileName: fileName,
          ...fields,
          product: {
            connect: {
              id: productId,
            },
          },
        },
      });
      return image;
    } catch (e) {
      console.log(`Error creating file: ${e}`);
    }
  }

  async findById(id: number): Promise<Image> {
    const image = await this.prismaService.image.findUnique({
      where: {
        id: id,
      },
      include: { product: true },
    });
    return image;
  }
}
