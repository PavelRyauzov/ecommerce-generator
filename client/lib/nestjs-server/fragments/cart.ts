const cartFragment = /* GraphQL */ `
    fragment cart on Cart {
        id
        lines {
            id
            quantity
            totalAmount {
                amount
                currencyCode
            }
            product {
                id
                title
            }
        }
        totalQuantity
        totalAmount {
            amount
            currencyCode
        }
    }
`;

export default cartFragment;
