import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product.dto';
import { GetProductsByQuery } from './dto/get-products-by-query.dto';
import { UpdateProduct } from './dto/update-product.dto';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    findAll(productQueryDto: GetProductsByQuery): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(productDto: CreateProduct): Promise<Product>;
    delete(id: string): Promise<string>;
    update(id: string, productDto: UpdateProduct): Promise<Product>;
}
