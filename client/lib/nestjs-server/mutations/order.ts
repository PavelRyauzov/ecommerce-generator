import orderFragment from '@/lib/nestjs-server/fragments/order';

export const createOrderMutation = /* GraphQL */ `
    mutation createOrder($dataInput: OrderDataInput!, $linesInput: [OrderLineInput!]!) {
        createOrder(dataInput: $dataInput, linesInput: $linesInput) {
            ...order
        }
    }
    ${orderFragment}
`;