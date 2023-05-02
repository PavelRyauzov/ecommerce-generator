import { Args, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  async products() {
    const products = await this.productService.findAll();
    console.dir(products, { depth: null });
    return products;
  }

  @Query('product')
  async product(@Args('id') id: string) {
    const product = await this.productService.findById(parseInt(id));
    console.dir(product, { depth: null });
    return product;
  }
}
