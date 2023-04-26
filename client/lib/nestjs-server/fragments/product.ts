

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        availableForSale
        title
        description
        price
    }
`;

export default productFragment;
