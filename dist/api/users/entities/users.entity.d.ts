import { UserRole } from '../enum/users.enum';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
