import cartFragment from '@/lib/nestjs-server/fragments/cart';

export const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    createCart(input: $lineItems) {
      ...cart
    }
  }
  ${cartFragment}
`;

export const addToCartMutation = /* GraphQL */ `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
    }
    ${cartFragment}
`;
