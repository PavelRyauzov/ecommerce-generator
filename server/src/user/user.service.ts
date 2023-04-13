import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserRoleService} from "../user-role/user-role.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private userRoleService: UserRoleService) {}
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const userRole = await this.userRoleService.getUserRoleByValue("USER");
        await user.$set('userRoles', [userRole.id]);
        user.userRoles = [userRole];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }
}
