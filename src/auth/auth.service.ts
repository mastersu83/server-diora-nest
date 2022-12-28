import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email: username, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
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
      return userData;
    }
  }
}
