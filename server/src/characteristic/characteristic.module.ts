import { Module } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { PrismaService } from '../prisma.service';
import { MoneyModule } from '../money/money.module';

@Module({
  imports: [MoneyModule],
  providers: [PrismaService, CharacteristicService],
  exports: [CharacteristicService],
})
export class CharacteristicModule {}
