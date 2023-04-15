import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
        password: dto.password,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
