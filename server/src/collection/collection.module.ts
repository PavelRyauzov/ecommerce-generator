import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionResolver } from './collection.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, CollectionService, CollectionResolver],
})
export class CollectionModule {}
