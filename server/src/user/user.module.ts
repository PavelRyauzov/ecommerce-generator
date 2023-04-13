import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserRole} from "../user-role/user-role.model";
import {UsersRoles} from "../user-role/users-roles.model";
import {UserRoleModule} from "../user-role/user-role.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, UserRole, UsersRoles]),
        UserRoleModule
    ],
    exports: [UserService]
})
export class UserModule {}
