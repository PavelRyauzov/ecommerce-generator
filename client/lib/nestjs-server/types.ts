export type Menu = {
  title: string;
  path: string;
};

export type Product = {
  id: string;
  availableForSale: boolean;
  title: string;
  description: string;
  price: number;
  collection: Collection;
  collectionId: string;
}

export type Collection = {
  id: string;
  title: string;
  products: Product[];
}

export type ProductOperation = {
  data: { product: Product };
  variables: {
    id: string;
  };
};