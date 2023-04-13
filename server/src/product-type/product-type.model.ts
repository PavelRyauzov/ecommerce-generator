import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Product} from "../product/product.model";

interface ProductTypeCreationAttrs {
    name: string;
}

@Table({tableName: 'product_type', createdAt: false, updatedAt: false})
export class ProductType extends Model<ProductType, ProductTypeCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @HasMany(() => Product)
    products: Product[];

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    external_id: string;
}