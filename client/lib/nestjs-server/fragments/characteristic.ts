const characteristicFragment = /* GraphQL */ `
    fragment characteristic on Characteristic {
        id
        availableForSale
        title
        price {
            ...price
        }
    }
`;

export default characteristicFragment;
