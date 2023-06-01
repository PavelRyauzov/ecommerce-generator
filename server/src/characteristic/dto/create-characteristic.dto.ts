export class CreateCharacteristicDto {
  readonly availableForSale: boolean;
  readonly title: string;
  readonly productId: number;
  readonly externalId?: string;
}
