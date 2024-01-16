import { Module } from '@nestjs/common';
import { ProductsModule } from './api/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './api/products/entities/product.entity';
import { UsersModule } from './api/users/users.module';
import { User } from './api/users/entities/users.entity';
import { OrdersModule } from './api/orders/orders.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      database: './database.sqlite',
      type: 'sqlite',
      synchronize: true,
      logging: true,
      entities: [Product, User],
    }),
    ProductsModule,
    UsersModule,
    OrdersModule,
  ],
})
export class AppModule {}
