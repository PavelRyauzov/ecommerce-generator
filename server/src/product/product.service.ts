import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./product.model";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository: typeof Product) {}

    async getAllProducts() {
        const products = await this.productRepository.findAll({include: {all: true}});
        return products;
    }
}
