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
                featuredImage {
                    id
                    fileName
                    altText
                }
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
