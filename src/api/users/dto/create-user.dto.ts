import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enum/users.enum';

export class CreateUser {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @MinLength(4)
  @MaxLength(20)
  password: string;

  @MaxLength(40)
  @IsEmail()
  email: string;

  @Matches('password')
  confirmPassword: string;

  @IsOptional()
  role?: UserRole;
}
