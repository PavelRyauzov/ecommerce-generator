const characteristicFragment = /* GraphQL */ `
    fragment characteristic on Characteristic {
        id
        availableForSale
        title
        price {
            ...money
        }
    }
`;

export default characteristicFragment;
