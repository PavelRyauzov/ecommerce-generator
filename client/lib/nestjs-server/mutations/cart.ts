import cartFragment from '@/lib/nestjs-server/fragments/cart';

export const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    createCart(input: $lineItems) {
      ...cart
    }
  }
  ${cartFragment}
`;
