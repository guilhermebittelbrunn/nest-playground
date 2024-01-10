import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateProduct {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;
}
