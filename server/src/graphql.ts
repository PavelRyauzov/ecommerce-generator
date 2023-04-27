
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCollection {
    title: string;
}

export class CreateProduct {
    availableForSale: boolean;
    title: string;
    description: string;
    price: number;
    collectionId: string;
}

export class Collection {
    id: string;
    title: string;
    products: Nullable<Product>[];
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

export abstract class IMutation {
    abstract createCollection(input?: Nullable<CreateCollection>): Collection | Promise<Collection>;

    abstract createProduct(input?: Nullable<CreateProduct>): Product | Promise<Product>;
}

export class Image {
    id: string;
    fileName: string;
    altText: string;
    product: Product;
    productId: number;
    featuredBy?: Nullable<Product>;
    featuredById?: Nullable<number>;
    createdAt: string;
    updatedAt: string;
}

export class Product {
    id: string;
    availableForSale: boolean;
    title: string;
    description: string;
    price: number;
    collection: Collection;
    collectionId: string;
    images: Nullable<Image>[];
    featuredImage?: Nullable<Image>;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
