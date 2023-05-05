
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Characteristic {
    id: string;
    availableForSale: boolean;
    title: string;
    product: Product;
    price: Price;
}

export class Collection {
    id: string;
    title: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
}

export abstract class IQuery {
    abstract collections(): Collection[] | Promise<Collection[]>;

    abstract collection(id: string): Nullable<Collection> | Promise<Nullable<Collection>>;

    abstract images(): Image[] | Promise<Image[]>;

    abstract image(id: string): Nullable<Image> | Promise<Nullable<Image>>;

    abstract products(): Product[] | Promise<Product[]>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;
}

export class Image {
    id: string;
    fileName: string;
    altText: string;
    createdAt: string;
    updatedAt: string;
}

export class Price {
    id: string;
    amount: number;
    currencyCode: string;
}

export class Product {
    id: string;
    availableForSale: boolean;
    title: string;
    description: string;
    price: Price;
    featuredImage?: Nullable<Image>;
    images: Image[];
    characteristics?: Nullable<Nullable<Characteristic>[]>;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
