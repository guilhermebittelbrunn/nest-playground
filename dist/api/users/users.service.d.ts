import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUser } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(id: string): Promise<User>;
    create(userDto: CreateUser): Promise<string>;
    login(userDto: LoginUser): Promise<string>;
    update(token: string, userDto: UpdateUser): Promise<string>;
}
