import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto, loginDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create-user')
  createUser(@Body() createUserDto: createUserDto) {
    return this.userService.registerUser(createUserDto);
  }
  @Get('/login')
  loginUser(@Body() loginDto: loginDto) {
    return this.userService.loggedIn(loginDto);
  }
}
