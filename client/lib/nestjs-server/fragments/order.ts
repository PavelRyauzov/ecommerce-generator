const orderFragment = /* GraphQL */ `
    fragment order on Order {
        id
        email
        phoneNumber
        firstName
        lastName
        patronymic
        address
        zipCode
        lines {
            quantity
        }
    }
`;

export default orderFragment;
