import { IsOptional } from 'class-validator';
import { ProductStatus } from '../interfaces/product.model';

export class GetProductsByQuery {
  @IsOptional()
  search: string;

  @IsOptional()
  status: ProductStatus;

  @IsOptional()
  price: number;
}
