import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './model/product.entity';
import { Product } from './model/product.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity) 
    private productRepository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOneBy(id: number) {
    return await this.productRepository.findOneBy({id});
  }

  async create(Product: Product): Promise<ProductEntity> {
    return await this.productRepository.save(Product);
  }

  async update(productData: ProductEntity): Promise<void> {
    const { id, name, category} = productData;
    const product = await this.findOneBy(id);

    product.name = name ? name : product.name;
    product.category = category ? category : product.category;

    await this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete({id});
  }
}
