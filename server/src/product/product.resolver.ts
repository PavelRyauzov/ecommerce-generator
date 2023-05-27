import { Args, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { getConnectionOutputForClient } from '../utils';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('products')
  async products(
    @Args('sortKey') sortKey: string,
    @Args('reverse') reverse: boolean,
    @Args('query') query = '',
    @Args('first') first: number,
    @Args('offset') offset = 0,
  ) {
    const products = await this.productService.findByParams(
      sortKey,
      reverse,
      query,
      first,
      offset,
    );

    return getConnectionOutputForClient<Product>(products);
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
