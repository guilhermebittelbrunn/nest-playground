import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FreightOrder, StatusOrder } from '../enum/orders.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ default: StatusOrder.IN_PROGRESS })
  status: StatusOrder;

  @Column({ default: FreightOrder.CIF })
  freight: FreightOrder;
}
