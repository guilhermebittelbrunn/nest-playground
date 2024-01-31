import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUser } from './dto/login-user.dto';
import { User } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IAccessToken } from './interfaces/access-token_interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUser): Promise<IAccessToken> {
    const { email, password } = userDto;
    const user: User = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { id: user.id };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    }

    throw new BadRequestException(`Email or password incorrect`);
  }
}
