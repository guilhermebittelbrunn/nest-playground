import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    findOne(id: string): Promise<Partial<User>>;
    create(userDto: CreateUser): Promise<string>;
    login(userDto: LoginUser): Promise<{
        token: string;
    }>;
    update(token: string, userDto: UpdateUser): Promise<Partial<User>>;
    delete(id: string): Promise<string>;
}
