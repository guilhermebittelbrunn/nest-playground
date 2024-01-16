import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    const { password, ...userData } = user;
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return userData;
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

  async login(userDto: LoginUser): Promise<{ token: string }> {
    const { email, password } = userDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { id } = user;
      const token = await this.jwtService.sign({ id });
      return { token };
    }

    throw new BadRequestException(`Email or password incorrect`);
  }

  async update(token: string, userDto: UpdateUser): Promise<Partial<User>> {
    const idUser = JSON.parse(atob(token.split('.')[1])).id;
    const user = await this.userRepository.findOne(idUser);
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
