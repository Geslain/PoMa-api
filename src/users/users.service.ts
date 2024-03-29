import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto | SignUpDto) {
    return await this.userModel.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, { returnOriginal: false })
      .exec();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
