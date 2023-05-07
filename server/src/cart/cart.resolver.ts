import { Args, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';

@Resolver('Cart')
export class CartResolver {
  constructor(private cartService: CartService) {}
  
  @Query('cart')
  async cart(@Args('id') id: string) {
    const cart = await this.cartService.findById(parseInt(id));
    return cart;
  }
}
