import { Args, Query, Resolver } from '@nestjs/graphql';
import { CollectionService } from './collection.service';

@Resolver('Collection')
export class CollectionResolver {
  constructor(private collectionService: CollectionService) {}

  @Query('collections')
  async collections() {
    const collections = await this.collectionService.findAll();
    return collections;
  }

  @Query('collection')
  async collection(@Args('id') id: string) {
    const collection = await this.collectionService.findById(parseInt(id));
    return collection;
  }
}
