import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CartLineInput } from '../graphql';

@Resolver('Cart')
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query('cart')
  async cart(@Args('id') id: string) {
    const cart = await this.cartService.findById(parseInt(id));
    return cart;
  }

  @Mutation('createCart')
  async create(@Args('input') inputs: CartLineInput[]) {
    const cart = await this.cartService.create(inputs);
    console.dir(cart, { depth: null });
    return cart;
  }

  @Mutation('cartLinesAdd')
  async addLines(
    @Args('cartId') cartId: string,
    @Args('lines') lines: CartLineInput[],
  ) {
    const cart = await this.cartService.addLines(parseInt(cartId), lines);
    return cart;
  }
}
