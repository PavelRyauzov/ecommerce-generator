import { Module } from '@nestjs/common';
import { MoneyService } from './money.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, MoneyService],
  exports: [MoneyService],
})
export class MoneyModule {}
