import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUser): Promise<string>;
    update(token: string, userDto: UpdateUser): Promise<Partial<User>>;
    delete(id: string): Promise<string>;
}
