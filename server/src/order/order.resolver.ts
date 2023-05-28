import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderDataInput, OrderLineInput } from '../graphql';
import { OrderService } from './order.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query('order')
  async order(@Args('id') id: string) {
    const order = await this.orderService.findById(parseInt(id));
    return order;
  }

  @Mutation('createOrder')
  async create(
    @Args('dataInput') dataInput: OrderDataInput,
    @Args('linesInput') linesInput: OrderLineInput[],
  ) {
    const order = await this.orderService.create(dataInput, linesInput);
    return order;
  }
}
