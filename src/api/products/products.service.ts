import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dto/create-product.dto';
import { GetProductsByQuery } from './dto/get-products-by-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`product ${id} not found`);
    }

    return product;
  }

  async findByQuery(productQueryDto: GetProductsByQuery): Promise<Product[]> {
    const { search, status, price } = productQueryDto;

    const products = await this.productRepository.find({});

    // if()

    return products;
  }

  async create(produtDto: CreateProduct): Promise<Product> {
    return await this.productRepository.save(produtDto);
  }

  async delete(id: string): Promise<string> {
    const removedElement = await this.productRepository.delete(id);
    if (removedElement.affected === 0) {
      throw new NotFoundException(`${id} not found`);
    }
    return `${id} successfully deleted`;
  }

  async update(id: string, productDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, productDto);
    await this.productRepository.save(product);
    return product;
  }
}
