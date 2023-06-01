import { Args, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';

@Resolver('Image')
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Query('image')
  async image(@Args('id') id: string) {
    const image = await this.imageService.findById(parseInt(id));
    return image;
  }
}
