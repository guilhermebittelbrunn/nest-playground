"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const products_module_1 = require("./api/products/products.module");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./api/products/entities/product.entity");
const users_module_1 = require("./api/users/users.module");
const users_entity_1 = require("./api/users/entities/users.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            products_module_1.ProductsModule,
            typeorm_1.TypeOrmModule.forRoot({
                database: './database.sqlite',
                type: 'sqlite',
                synchronize: true,
                logging: true,
                entities: [product_entity_1.Product, users_entity_1.User],
            }),
            users_module_1.UsersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map