import orderFragment from '@/lib/nestjs-server/fragments/order';

export const getOrderQuery = /* GraphQL */ `
    query getOrder($orderId: ID!) {
        order(id: $orderId) {
            ...order
        }
    }
    ${orderFragment}
`;
