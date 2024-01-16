import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
