import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./user/user.model";
import { ProductModule } from './product/product.module';
import { UserRoleService } from './user-role/user-role.service';
import { UserRoleController } from './user-role/user-role.controller';
import { UserRoleModule } from './user-role/user-role.module';
import {UserRole} from "./user-role/user-role.model";
import {UsersRoles} from "./user-role/users-roles.model";
import { AuthModule } from './auth/auth.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, UserRole, UsersRoles],
            autoLoadModels: true
        }),
        UserModule,
        UserRoleModule,
        ProductModule,
        AuthModule
    ]
})
export class AppModule {}