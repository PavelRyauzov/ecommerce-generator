import { Injectable } from '@nestjs/common';
import {CreateUserRoleDto} from "./dto/create-user-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {UserRole} from "./user-role.model";

@Injectable()
export class UserRoleService {
    constructor(@InjectModel(UserRole) private userRoleRepository: typeof UserRole) {}

    async createUserRole(dto: CreateUserRoleDto) {
        const userRole = await this.userRoleRepository.create(dto);
        return userRole;
    }

    async getUserRoleByValue(value: string) {
        const userRole = await this.userRoleRepository.findOne({where: {value}});
        return userRole;
    }
}
