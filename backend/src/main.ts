import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Добавим глобальный пайплайн валидации
  app.useGlobalPipes(new ValidationPipe());

  // Подключим документацию Swagger
  const config = new DocumentBuilder()
    .setTitle('КупиПодариДай')
    .setDescription('Документация API сервиса вишлистов')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
