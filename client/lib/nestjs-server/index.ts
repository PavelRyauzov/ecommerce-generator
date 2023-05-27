import {
  AddToCartOperation,
  Cart,
  CartOperation,
  Collection, CollectionOperation,
  CollectionProductsOperation,
  CollectionsOperation, Connection,
  CreateCartOperation,
  FrontCollection,
  Menu,
  Product,
  ProductOperation,
  ProductRecommendationsOperation,
  ProductsOperation,
  RemoveFromCartOperation,
  UpdateCartOperation,
} from '@/lib/nestjs-server/types';
import { SERVER_GRAPHQL_API_ENDPOINT } from '@/lib/constants';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from '@/lib/nestjs-server/queries/product';
import {
  getCollectionProductsQuery, getCollectionQuery,
  getCollectionsQuery,
} from '@/lib/nestjs-server/queries/collection';
import { getCartQuery } from '@/lib/nestjs-server/queries/cart';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from '@/lib/nestjs-server/mutations/cart';

const domain = `http://${process.env.SERVER_DOMAIN!}`;
const endpoint = `${domain}${SERVER_GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function serverFetch<T>({
  query,
  variables,
  headers,
  cache = 'force-cache'
}: {
  query: string;
  variables?: ExtractVariables<T>;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      next: { revalidate: 900 } // 15 minutes
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      query
    };
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const res = await serverFetch<ProductOperation>({
    query: getProductQuery,
    variables: {
      id
    }
  });

  return reshapeProduct(res.body.data.product);
}

export async function getCollectionProducts(id: string): Promise<Product[]> {
  const res = await serverFetch<CollectionProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      id
    }
  });

  //console.log(res);

  return reshapeProducts(res.body.data.collection.products);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await serverFetch<ProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

const reshapeProduct = (product: Product) => {
  if (!product) {
    return undefined;
  }

  return {
    ...product
  };
};

const reshapeProducts = (products: Product[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function getMenu(): Promise<Menu[]> {
  const menu: Menu[] = [
    {
      title: 'All',
      path: '/search'
    }
  ];
  return menu;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await serverFetch<CartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store'
  });

  if (!res.body.data.cart) {
    return null;
  }

  return reshapeCart(res.body.data.cart);
}

export async function createCart(): Promise<Cart> {
  const res = await serverFetch<CreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.createCart);
}

const reshapeCart = (cart: Cart): Cart => {
  return {
    ...cart
  };
};

export async function addToCart(
  cartId: string,
  lines: { productId: string; characteristicId?: string; quantity: number }[]
): Promise<Cart> {
  const res = await serverFetch<AddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await serverFetch<RemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; productId: string; characteristicId?: string; quantity: number }[]
): Promise<Cart> {
  const res = await serverFetch<UpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await serverFetch<ProductsOperation>({
    query: getProductsQuery,
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

export async function getCollections(): Promise<FrontCollection[]> {
  const res = await serverFetch<CollectionsOperation>({ query: getCollectionsQuery });
  const serverCollections = res.body?.data?.collections;
  const collections = [
    {
      id: '',
      title: 'All',
      path: '/search'
    },

    ...reshapeCollections(serverCollections)
  ];

  return collections;
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await serverFetch<CollectionOperation>({
    query: getCollectionQuery,
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

const reshapeCollections = (collections: Collection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeCollection = (collection: Collection): FrontCollection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.id}`
  };
};
