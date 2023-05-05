import imageFragment from './image';
import priceFragment from './price';

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        availableForSale
        title
        description
        price {
            ...price
        }
        featuredImage {
            ...image
        }
        images {
            ...image
        }
    }
    ${imageFragment}
    ${priceFragment}
`;

export default productFragment;
