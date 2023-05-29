import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CollectionModule } from './collection/collection.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { ImageModule } from './image/image.module';
import { CharacteristicModule } from './characteristic/characteristic.module';
import { MoneyModule } from './money/money.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public/static'),
    }),
    CollectionModule,
    ProductModule,
    FileModule,
    ImageModule,
    CharacteristicModule,
    MoneyModule,
    CartModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
