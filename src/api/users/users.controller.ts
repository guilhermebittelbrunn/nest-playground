import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from '../auth/dto/login-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUser): Promise<string> {
    return this.userService.create(userDto);
  }

  @Patch()
  update(
    @Headers('token') token: string,
    @Body() userDto: UpdateUser,
  ): Promise<Partial<User>> {
    return this.userService.update(token, userDto);
  }

  @Delete()
  delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
