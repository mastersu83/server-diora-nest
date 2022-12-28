import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.usersService.findOne({ email, password });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async register(user: CreateUserDto) {
    const userData = await this.usersService.findOne(user);

    if (!userData) {
      return await this.usersService.create(user);
    }

    throw new BadRequestException('Такая почта уже есть');
  }
  async login(user: CreateUserDto) {
    const userData = await this.usersService.findOne(user);

    if (userData) {
      return {
        user: userData,
        access_token: this.jwtService.sign({
          email: userData.email,
          password: userData.password,
        }),
      };
    }
  }
}
