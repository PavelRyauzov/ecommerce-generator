
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CartLineInput {
    productId: string;
    characteristicId?: Nullable<string>;
    quantity: number;
}

export class CartLineUpdateInput {
    id: string;
    productId: string;
    characteristicId?: Nullable<string>;
    quantity: number;
}

export class OrderLineInput {
    productId: string;
    characteristicId?: Nullable<string>;
    quantity: number;
}

export class OrderDataInput {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    address: string;
    zipCode: string;
}

export class Cart {
    id: string;
    lines?: Nullable<Nullable<CartItem>[]>;
    totalQuantity?: Nullable<number>;
    totalAmount?: Nullable<Money>;
}

export class CartItem {
    id: string;
    quantity: number;
    totalAmount: Money;
    product?: Nullable<Product>;
    characteristic?: Nullable<Characteristic>;
}

export abstract class IQuery {
    abstract cart(id: string): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract collections(): Collection[] | Promise<Collection[]>;

    abstract collection(id: string): Nullable<Collection> | Promise<Nullable<Collection>>;

    abstract images(): Image[] | Promise<Image[]>;

    abstract image(id: string): Nullable<Image> | Promise<Nullable<Image>>;

    abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract productsForDemonstration(): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;

    abstract products(sortKey: string, reverse: boolean, query: string, first: number, offset?: Nullable<number>): Nullable<ProductConnection> | Promise<Nullable<ProductConnection>>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract productRecommendations(id: string): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;
}

export abstract class IMutation {
    abstract createCart(input?: Nullable<CartLineInput[]>): Cart | Promise<Cart>;

    abstract cartLinesAdd(cartId: string, lines?: Nullable<CartLineInput[]>): Cart | Promise<Cart>;

    abstract cartLinesRemove(cartId: string, lineIds?: Nullable<Nullable<string>[]>): Cart | Promise<Cart>;

    abstract cartLinesUpdate(cartId: string, lines?: Nullable<CartLineUpdateInput[]>): Cart | Promise<Cart>;

    abstract createOrder(dataInput: OrderDataInput, linesInput: OrderLineInput[]): Order | Promise<Order>;
}

export class Characteristic {
    id: string;
    availableForSale: boolean;
    title: string;
    product: Product;
    price: Money;
}

export class Collection {
    id: string;
    title: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
}

export class Image {
    id: string;
    fileName: string;
    altText: string;
    createdAt: string;
    updatedAt: string;
}

export class Money {
    id: string;
    amount: number;
    currencyCode: string;
}

export class Order {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    address: string;
    zipCode: string;
    lines: OrderItem[];
}

export class OrderItem {
    id: string;
    productId: string;
    characteristicId?: Nullable<string>;
    quantity: number;
}

export class ProductConnection {
    edges?: Nullable<Nullable<ProductEdge>[]>;
}

export class ProductEdge {
    node?: Nullable<Product>;
}

export class Product {
    id: string;
    availableForSale: boolean;
    title: string;
    description: string;
    price: Money;
    featuredImage?: Nullable<Image>;
    images: Image[];
    characteristics?: Nullable<Nullable<Characteristic>[]>;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
