import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';
import * as bcrypt from 'bcrypt';
import { createUserDto, loginDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async registerUser(createUser: createUserDto): Promise<Users> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUser.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already exist');
      }
      const saltRound = 10;
      const hashPassword = await bcrypt.hash(createUser.password, saltRound);
      const body = {
        firstName: createUser.firstName,
        secondName: createUser.secondName,
        email: createUser.email,
        password: hashPassword,
      };
      const saveUser = this.userRepository.create(body);
      return this.userRepository.save(saveUser);
    } catch (error) {
      console.error('Error while creating users:', error);
      throw new BadRequestException(error);
    }
  }
  async loggedIn(loginDto: loginDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: loginDto.email },
      });
      if (!existingUser) {
        throw new BadRequestException('Email Not exist');
      }
      const hashPassword = await bcrypt.compare(
        loginDto.password,
        existingUser.password,
      );
      if (!hashPassword) {
        throw new BadRequestException('Email or Password not match');
      }

      return 'User login Successfully';
    } catch (error) {
      console.error('Error while creating users:', error);
      throw new BadRequestException(error);
    }
  }
}
