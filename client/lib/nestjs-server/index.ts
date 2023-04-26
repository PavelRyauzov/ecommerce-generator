import { Product, ProductOperation } from '@/lib/nestjs-server/types';
import { SERVER_GRAPHQL_API_ENDPOINT } from '@/lib/nestjs-server/constants';
import { getProductQuery } from '@/lib/nestjs-server/queries/product';

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



const reshapeProduct = (product: Product) => {
  if (!product) {
    return undefined;
  }

  return {
    ...product,
  };
};
