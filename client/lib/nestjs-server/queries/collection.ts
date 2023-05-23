import productFragment from '../fragments/product';
import { collectionFragment } from '@/lib/nestjs-server/fragments/collection';

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

export const getCollectionsQuery = /* GraphQL */ `
    query getCollections {
        collections {
           ...collection
        }
    }
    ${collectionFragment}
`;

export const getCollectionQuery = /* GraphQL */ `
    query getCollection($handle: String!) {
        collection(id: $handle) {
            ...collection
        }
    }
    ${collectionFragment}
`;
