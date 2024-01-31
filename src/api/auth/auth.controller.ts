import { Body, Controller, Post } from '@nestjs/common';
import { LoginUser } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { IAccessToken } from './interfaces/access-token_interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() userDto: LoginUser): Promise<IAccessToken> {
    return this.authService.login(userDto);
  }
}
