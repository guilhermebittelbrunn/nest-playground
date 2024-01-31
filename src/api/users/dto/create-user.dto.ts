import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enum/users.enum';

export class CreateUser {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @MaxLength(30)
  @MinLength(4)
  // @IsStrongPassword(
  //   {
  //     // minLength: 8,
  //     // minNumbers: 2,
  //     // minLowercase: 1,
  //     // minUppercase: 1,
  //     // minSymbols: 1,
  //   },
  //   { message: 'Password too weak, please try other password' },
  // )
  password: string;

  @MaxLength(40)
  @IsEmail()
  email: string;

  @IsOptional()
  role?: UserRole;
}
