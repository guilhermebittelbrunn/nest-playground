import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/users.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 40, unique: true })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ default: UserRole.PUBLIC })
  role: UserRole;
}
