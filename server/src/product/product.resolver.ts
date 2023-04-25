import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProduct } from '../graphql';
import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  async products() {
    return this.productService.findAll();
  }

  @Query('product')
  async product(@Args('id') id: string) {
    return this.productService.findById(id);
  }

  @Mutation('createProduct')
  async create(@Args('input') input: CreateProduct) {
    return this.productService.create(input);
  }
}
