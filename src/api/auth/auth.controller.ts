import { Body, Controller, Post } from '@nestjs/common';
import { LoginUser } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() userDto: LoginUser): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }
}
