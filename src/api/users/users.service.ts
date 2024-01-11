import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async create(userDto: CreateUser): Promise<string> {
    const userWithTheSameEmail = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (userWithTheSameEmail) {
      throw new ConflictException(`e-mail already exists, try again`);
    }

    await this.userRepository.save(userDto);
    return `User: ${userDto.name} successfully created`;
  }

  async login(userDto: LoginUser): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email: userDto.email,
        password: userDto.password,
      },
    });

    if (!user) {
      throw new BadRequestException(`Email or password incorrect`);
    }

    return 'User logged!';
  }

  async update(token: string, userDto: UpdateUser): Promise<string> {
    const idUser = JSON.parse(atob(token.split('.')[1])).id;
    const user = await this.userRepository.findOne(idUser);
    Object.assign(user, userDto);
    this.userRepository.save(user);
    return 'User updated';
  }
}
