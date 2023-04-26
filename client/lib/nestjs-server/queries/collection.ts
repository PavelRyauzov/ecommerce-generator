import productFragment from '../fragments/product';

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts($id: ID!) {
    collection(id: $id) {
      products {
        ...product
      }
    }
  }
  ${productFragment}
`;
