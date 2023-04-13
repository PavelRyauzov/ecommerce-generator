import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserRoleService} from "./user-role.service";
import {CreateUserRoleDto} from "./dto/create-user-role.dto";

@Controller('user-roles')
export class UserRoleController {
    constructor(private userRoleService: UserRoleService) {}

    @Post()
    create(@Body() dto: CreateUserRoleDto) {
        return this.userRoleService.createUserRole(dto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.userRoleService.getUserRoleByValue(value);
    }
}
