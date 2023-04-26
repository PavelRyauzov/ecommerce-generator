

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        availableForSale
        title
        description
        price
        collection {
            title
        }
    }
`;

export default productFragment;
