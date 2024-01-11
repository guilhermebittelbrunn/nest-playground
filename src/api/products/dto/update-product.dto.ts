import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { ProductStatus } from '../enums/product.enum';

export class UpdateProduct {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsPositive()
  price?: number;

  @IsOptional()
  status?: ProductStatus;
}
