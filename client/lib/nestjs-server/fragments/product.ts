import imageFragment from './image';
import priceFragment from './price';
import characteristicFragment from '@/lib/nestjs-server/fragments/characteristic';

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        availableForSale
        title
        description
        price {
            ...price
        }
        characteristics {
            ...characteristic
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
    ${characteristicFragment}
`;

export default productFragment;
