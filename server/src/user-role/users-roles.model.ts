import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {UserRole} from "./user-role.model";

@Table({tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => UserRole)
    @Column({type: DataType.INTEGER})
    userRoleId: number;
}
