import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUser, UpdateUser } from '../graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async users() {
    return this.userService.findAll();
  }

  @Query('user')
  async user(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Mutation('createUser')
  async create(@Args('input') input: CreateUser) {
    return this.userService.create(input);
  }

  @Mutation('updateUser')
  async update(@Args('input') input: UpdateUser) {
    return this.userService.update(input);
  }

  @Mutation('deleteUser')
  async delete(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
