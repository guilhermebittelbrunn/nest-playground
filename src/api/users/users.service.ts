import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async create(userDto: CreateUser): Promise<string> {
    try {
      const { password } = userDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.userRepository.save({ ...userDto, password: hashedPassword });
      return `User: ${userDto.name} successfully created`;
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('E-mail already exists, try again');
      }
      throw new InternalServerErrorException(`Error to create user: ${error}`);
    }
  }

  async update(token: string, userDto: UpdateUser): Promise<Partial<User>> {
    const idUser = JSON.parse(atob(token.split('.')[1])).id;
    const user: User = await this.findOne(idUser);
    Object.assign(user, userDto);
    this.userRepository.save(user);
    const { password, ...userData } = user;
    return userData;
  }

  async delete(id: string): Promise<string> {
    const removedElement = await this.userRepository.delete(id);
    if (removedElement.affected === 0) {
      throw new NotFoundException(`${id} not found`);
    }
    return `${id} successfully deleted`;
  }
}
