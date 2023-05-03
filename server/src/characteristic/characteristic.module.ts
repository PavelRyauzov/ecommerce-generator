import { Module } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, CharacteristicService],
})
export class CharacteristicModule {}
