import { Module } from '@nestjs/common';
import {UserRoleService} from "./user-role.service";
import {UserRoleController} from "./user-role.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserRole} from "./user-role.model";
import {User} from "../user/user.model";
import {UsersRoles} from "./users-roles.model";

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService],
    imports: [
        SequelizeModule.forFeature([UserRole, User, UsersRoles])
    ],
    exports: [
        UserRoleService
    ]
})
export class UserRoleModule {}
