import imageFragment from './image';

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        availableForSale
        title
        description
        price
        featuredImage {
            ...image
        }
        images {
            ...image
        }
    }
    ${imageFragment}
`;

export default productFragment;
