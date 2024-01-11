import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userDto: CreateUser): Promise<string> {
    return this.userService.create(userDto);
  }

  @Post('signin')
  login(@Body() userDto: LoginUser): Promise<string> {
    return this.userService.login(userDto);
  }

  @Patch()
  update(
    @Headers('token') token: string,
    @Body() userDto: UpdateUser,
  ): Promise<string> {
    return this.userService.update(token, userDto);
  }
}
