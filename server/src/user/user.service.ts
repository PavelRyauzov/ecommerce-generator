import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUser, UpdateUser } from '../graphql';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUser): Promise<User> {
    const user = await this.prismaService.user.create({
      data: input,
    });
    return user;
  }

  async update(input: UpdateUser): Promise<User> {
    const { id, email, firstName, lastName, password } = input;
    const user = await this.prismaService.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(email && { email }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(password && { password }),
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = this.prismaService.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = this.prismaService.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  }
}
