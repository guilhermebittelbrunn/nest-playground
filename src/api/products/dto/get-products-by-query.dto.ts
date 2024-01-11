import { IsOptional } from 'class-validator';
import { ProductStatus } from '../enums/product.enum';

export class GetProductsByQuery {
  @IsOptional()
  search: string;

  @IsOptional()
  status: ProductStatus;

  @IsOptional()
  price: number;
}
