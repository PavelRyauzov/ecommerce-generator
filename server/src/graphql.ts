
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CartLineInput {
    productId: string;
    characteristicId: string;
    quantity: number;
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
    abstract cart(): Cart[] | Promise<Cart[]>;

    abstract collections(): Collection[] | Promise<Collection[]>;

    abstract collection(id: string): Nullable<Collection> | Promise<Nullable<Collection>>;

    abstract images(): Image[] | Promise<Image[]>;

    abstract image(id: string): Nullable<Image> | Promise<Nullable<Image>>;

    abstract products(): Product[] | Promise<Product[]>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract productRecommendations(id: string): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;
}

export abstract class IMutation {
    abstract createCart(input?: Nullable<CartLineInput[]>): Cart | Promise<Cart>;
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
