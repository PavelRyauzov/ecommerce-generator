import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.issueTokens(user.id, user.email);

    return {
      id: user.id,
      email: user.email,
      ...tokens,
    };
  }

  private async issueTokens(userId: number, email: string) {
    const payload = { email: email, sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '14d',
    });

    return { accessToken, refreshToken };
  }
}
