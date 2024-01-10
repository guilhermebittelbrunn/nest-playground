import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product.dto';
import { GetProductsByQuery } from './dto/get-products-by-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  findAll(@Query() productQueryDto: GetProductsByQuery): Promise<Product[]> {
    if (Object.keys(productQueryDto).length > 0) {
      return this.productService.findByQuery(productQueryDto);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() productDto: CreateProduct): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.productService.delete(id);
  }
}
