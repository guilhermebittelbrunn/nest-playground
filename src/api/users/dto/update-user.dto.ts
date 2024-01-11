import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from '../enum/users.enum';

export class UpdateUser {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  role?: UserRole;
}
