import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { MoneyModule } from '../money/money.module';
import { ProductModule } from '../product/product.module';
import { CharacteristicModule } from '../characteristic/characteristic.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [MoneyModule, ProductModule, CharacteristicModule],
  providers: [PrismaService, CartService, CartResolver],
})
export class CartModule {}
