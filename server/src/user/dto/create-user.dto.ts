import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@domain.ru', description: 'E-mail address'})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'User password'})
    readonly password: string;
}