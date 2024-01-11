import { Module } from '@nestjs/common';
import { ProductsModule } from './api/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './api/products/entities/product.entity';
import { UsersModule } from './api/users/users.module';
import { User } from './api/users/entities/users.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      database: './database.sqlite',
      type: 'sqlite',
      synchronize: true,
      logging: true,
      entities: [Product, User],
    }),
    UsersModule,
  ],
})
export class AppModule {}
