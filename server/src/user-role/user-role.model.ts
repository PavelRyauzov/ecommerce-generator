import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {UsersRoles} from "./users-roles.model";

interface UserRoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'user_role'})
export class UserRole extends Model<UserRole, UserRoleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UsersRoles)
    users: User[];
}
