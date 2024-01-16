import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  //   @Create()
  //   create(@Header)
}
