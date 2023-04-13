import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./product.model";
import {ProductBrand} from "../product-brand/product-brand.model";
import {ProductType} from "../product-type/product-type.model";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
      SequelizeModule.forFeature([Product, ProductType, ProductBrand])
  ]
})
export class ProductModule {}
