import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main')
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'product',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'product-consumer',
        allowAutoTopicCreation: true
      }
    }
  });
  await app.listen();
}
bootstrap();
