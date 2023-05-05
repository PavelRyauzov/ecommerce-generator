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
