import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dto/create-product.dto';
import { GetProductsByQuery } from './dto/get-products-by-query.dto';
import { UpdateProduct } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(productQueryDto: GetProductsByQuery): Promise<Product[]> {
    const { search, status, price } = productQueryDto;
    const query = this.productRepository.createQueryBuilder('product');

    if (search) {
      query.andWhere('product.title LIKE :search', { search: `%${search}%` });
    }

    if (status) {
      query.andWhere('product.status IN (:status)', { status });
    }

    if (price) {
      query.andWhere('product.price >= :price', { price });
    }

    return await query.getMany();
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

  async update(id: string, productDto: UpdateProduct): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, productDto);
    const savedProduct = await this.productRepository.save(product);
    console.log('product', product);
    console.log('saved product', savedProduct);
    return savedProduct;
  }
}
