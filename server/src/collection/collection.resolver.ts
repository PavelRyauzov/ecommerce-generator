import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { CreateCollection } from '../graphql';

@Resolver('Collection')
export class CollectionResolver {
  constructor(private collectionService: CollectionService) {}

  @Query('collections')
  async collections() {
    return this.collectionService.findAll();
  }

  @Query('collection')
  async collection(@Args('id') id: string) {
    return this.collectionService.findById(id);
  }

  @Mutation('createCollection')
  async create(@Args('input') input: CreateCollection) {
    return this.collectionService.create(input);
  }
}
