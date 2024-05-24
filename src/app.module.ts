import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './model/product.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '12345678',
    database: 'example',
    entities: [ProductEntity],
    synchronize: true,
  }), TypeOrmModule.forFeature([ProductEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
