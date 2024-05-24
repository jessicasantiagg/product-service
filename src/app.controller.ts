import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProductEntity } from './model/product.entity';
import { Product } from './model/product.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-product')
  async index(): Promise<ProductEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('create-product')
  async create(@Payload() data: any): Promise<ProductEntity> {
    return await this.appService.create(data);
  }

  @MessagePattern('update-product')
  async update(@Payload() data: any): Promise<void> {
    await this.appService.update(data);
  }

  @MessagePattern('delete-product')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.delete(Number(data.id));
  }
}
