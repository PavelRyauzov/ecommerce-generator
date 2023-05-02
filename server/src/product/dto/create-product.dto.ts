export class CreateProductDto {
  readonly availableForSale: boolean;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly collectionId: number;
}
