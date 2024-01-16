import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dto/create-product.dto';
import { GetProductsByQuery } from './dto/get-products-by-query.dto';
import { UpdateProduct } from './dto/update-product.dto';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(productQueryDto: GetProductsByQuery): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(produtDto: CreateProduct): Promise<Product>;
    delete(id: string): Promise<string>;
    update(id: string, productDto: UpdateProduct): Promise<Product>;
}
