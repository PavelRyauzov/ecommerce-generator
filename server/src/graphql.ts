
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

export class CreateUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export class UpdateUser {
    id: string;
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
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

    abstract products(): Product[] | Promise<Product[]>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createCollection(input?: Nullable<CreateCollection>): Collection | Promise<Collection>;

    abstract createProduct(input?: Nullable<CreateProduct>): Product | Promise<Product>;

    abstract createUser(input?: Nullable<CreateUser>): User | Promise<User>;

    abstract updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Product {
    id: string;
    availableForSale: boolean;
    title: string;
    description: string;
    price: number;
    collection: Collection;
    collectionId: string;
    createdAt: string;
    updatedAt: string;
}

export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
