import { Args, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  async products() {
    const products = await this.productService.findAll();
    return products;
  }

  @Query('product')
  async product(@Args('id') id: string) {
    const product = await this.productService.findById(parseInt(id));
    return product;
  }

  @Query('productRecommendations')
  async productRecommendations(@Args('id') id: string) {
    const product = await this.productService.findSimilar(parseInt(id));
    return product;
  }
}
