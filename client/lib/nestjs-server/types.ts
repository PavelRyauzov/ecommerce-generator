export type Menu = {
  title: string;
  path: string;
};

export type Product = {
  id: string;
  availableForSale: boolean;
  title: string;
  description: string;
  price: Money;
  featuredImage: Image;
  images: Image[];
  characteristics: Characteristic[];
};

export type Collection = {
  id: string;
  title: string;
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

export type Money = {
  amount: number;
  currencyCode: string;
};

export type Characteristic = {
  id: string;
  availableForSale: boolean;
  title: string;
  price: Money;
};

export type ProductRecommendationsOperation = {
  data: {
    productRecommendations: Product[];
  };
  variables: {
    productId: string;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  lines: CartItem[];
  totalQuantity: number;
  totalAmount: Money;
};

export type CartItem = {
  id: string;
  quantity: number;
  totalAmount: Money;
  product: Product;
  characteristic: Characteristic;
};

export type CreateCartOperation = {
  data: {
    createCart: Cart;
  };
};

export type CartOperation = {
  data: {
    cart: Cart;
  };
  variables: {
    cartId: string;
  };
};

export type AddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: Cart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      productId: string;
      characteristicId?: string;
      quantity: number;
    }[];
  };
};

export type UpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: Cart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      productId: string;
      characteristicId?: string;
      quantity: number;
    }[];
  };
};

export type RemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: Cart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ProductsOperation = {
  data: {
    products: Product[];
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type FrontCollection = Collection & {
  path: string;
};

export type CollectionsOperation = {
  data: {
    collections: Collection[];
  };
};

export type CollectionOperation = {
  data: {
    collection: Collection;
  };
  variables: {
    handle: string;
  };
};


