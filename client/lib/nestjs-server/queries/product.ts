import productFragment from '@/lib/nestjs-server/fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($id: ID!) {
    product(id: $id) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
    query getProductRecommendations($productId: ID!) {
        productRecommendations(id: $productId) {
            ...product
        }
    }
    ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
    query getProducts($sortKey: String!, $reverse: Boolean!, $query: String) {
        products(sortKey: $sortKey, reverse: $reverse, query: $query) {
            ...product
        }
    }
    ${productFragment}
`;
