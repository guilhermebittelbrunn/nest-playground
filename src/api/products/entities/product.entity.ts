import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from '../enums/product.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ default: ProductStatus.ACTIVE })
  status: ProductStatus;
}
