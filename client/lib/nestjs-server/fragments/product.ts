import imageFragment from './image';
import characteristicFragment from '@/lib/nestjs-server/fragments/characteristic';
import moneyFragment from './price';

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        availableForSale
        title
        description
        price {
            ...money
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
    ${moneyFragment}
    ${characteristicFragment}
`;

export default productFragment;
