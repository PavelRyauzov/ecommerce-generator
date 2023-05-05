export class CreateProductDto {
  readonly availableForSale: boolean;
  readonly title: string;
  readonly description: string;
  readonly collectionId: number;
}
