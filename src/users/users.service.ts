import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll() {
    return this.userModel.find();
  }
  async findOneByEmail({ email }: { email: string }) {
    const user = this.userModel.findOne({ email });

    if (!user) {
      return null;
    }
    return user;
  }
  async findOneById(_id) {
    const user = this.userModel.findOne({ _id });

    if (!user) {
      return null;
    }
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  remove(_id: number) {
    return `This action removes a #${_id} user`;
  }
}
