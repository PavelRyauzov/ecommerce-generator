import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, PriceService],
  exports: [PriceService],
})
export class PriceModule {}
