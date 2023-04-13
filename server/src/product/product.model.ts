import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ProductType} from "../product-type/product-type.model";
import {ProductBrand} from "../product-brand/product-brand.model";

@Table({tableName: 'product', createdAt: false, updatedAt: false})
export class Product extends Model {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: true})
    vendorCode: string;

    img: string;

    @ForeignKey(() => ProductType)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    productTypeId: number;

    @BelongsTo(() => ProductType)
    productType: ProductType;

    @ForeignKey(() => ProductBrand)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    productBrandId: number;

    @BelongsTo(() => ProductBrand)
    productBrand: ProductBrand;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    externalId: string;
}