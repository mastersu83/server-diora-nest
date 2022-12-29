import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { utils } from '../utils/utils';

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
    const user = await this.usersService.findOne({ email });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  generateJwtToken(payload) {
    return this.jwtService.sign({
      email: payload.email,
      id: payload.id,
    });
  }

  async register(user: CreateUserDto) {
    const userData = await this.usersService.findOne(user);

    if (!userData) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
      const newUser = await this.usersService.create({
        email: user.email,
        password: hashedPassword,
        avatarUrl: user.avatarUrl,
        fullName: user.fullName,
      });

      return utils.sanitizeUser(newUser);
    }

    throw new BadRequestException('Такая почта уже есть');
  }
  async login(user: CreateUserDto) {
    const userData = await this.usersService.findOne(user);

    if (userData) {
      return {
        ...utils.sanitizeUser(userData),
        access_token: this.generateJwtToken(userData),
      };
    }
  }
  async getMe(user: CreateUserDto) {
    const userData = await this.usersService.findOne(user);

    if (userData) {
      return utils.sanitizeUser(userData);
    }
  }
}
