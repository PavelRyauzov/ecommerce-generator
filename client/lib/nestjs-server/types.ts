export type Menu = {
  title: string;
  path: string;
};

export type Product = {
  id: string;
  availableForSale: boolean;
  title: string;
  description: string;
  price: Price;
  featuredImage: Image;
  images: Image[];
  characteristics: Characteristic[];
};

export type Collection = {
  id: string;
  title: string;
  products: Product[];
};

export type ProductOperation = {
  data: { product: Product };
  variables: {
    id: string;
  };
};

export type CollectionProductsOperation = {
  data: {
    collection: {
      products: Product[];
    };
  };
  variables: {
    id: string;
  };
};

export type Image = {
  fileName: string;
  altText: string;
};

export type Price = {
  amount: number;
  currencyCode: string;
};

export type Characteristic = {
  id: string;
  availableForSale: boolean;
  title: string;
  price: Price;
};

export type ProductRecommendationsOperation = {
  data: {
    productRecommendations: Product[];
  };
  variables: {
    productId: string;
  };
};
