import { UserRole } from '../enum/users.enum';
export declare class CreateUser {
    name: string;
    password: string;
    email: string;
    confirmPassword: string;
    role?: UserRole;
}
