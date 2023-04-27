import { Args, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';

@Resolver('Image')
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Query('images')
  async images() {
    return this.imageService.findAll();
  }

  @Query('image')
  async image(@Args('id') id: string) {
    return this.imageService.findById(id);
  }
}
