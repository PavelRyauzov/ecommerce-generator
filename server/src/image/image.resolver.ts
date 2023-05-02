import { Args, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';

@Resolver('Image')
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Query('images')
  async images() {
    const images = await this.imageService.findAll();
    console.dir(images, { depth: null });
    return images;
  }

  @Query('image')
  async image(@Args('id') id: string) {
    const image = await this.imageService.findById(parseInt(id));
    console.dir(image, { depth: null });
    return image;
  }
}
