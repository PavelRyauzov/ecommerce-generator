import { Module } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { PrismaService } from '../prisma.service';
import { PriceModule } from '../price/price.module';

@Module({
  imports: [PriceModule],
  providers: [PrismaService, CharacteristicService],
})
export class CharacteristicModule {}
