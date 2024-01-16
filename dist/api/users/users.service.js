"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entities/users.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        const { password, ...userData } = user;
        if (!user) {
            throw new common_1.NotFoundException(`User ${id} not found`);
        }
        return userData;
    }
    async create(userDto) {
        try {
            const { password } = userDto;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            await this.userRepository.save({ ...userDto, password: hashedPassword });
            return `User: ${userDto.name} successfully created`;
        }
        catch (error) {
            if (error.errno === 19) {
                throw new common_1.ConflictException('E-mail already exists, try again');
            }
            throw new common_1.InternalServerErrorException(`Error to create user: ${error}`);
        }
    }
    async login(userDto) {
        const { email, password } = userDto;
        const user = await this.userRepository.findOneBy({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { id } = user;
            const token = this.jwtService.sign({ id });
            return { token };
        }
        throw new common_1.BadRequestException(`Email or password incorrect`);
    }
    async update(token, userDto) {
        const idUser = JSON.parse(atob(token.split('.')[1])).id;
        const user = await this.userRepository.findOne(idUser);
        Object.assign(user, userDto);
        this.userRepository.save(user);
        const { password, ...userData } = user;
        return userData;
    }
    async delete(id) {
        const removedElement = await this.userRepository.delete(id);
        if (removedElement.affected === 0) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        return `${id} successfully deleted`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map