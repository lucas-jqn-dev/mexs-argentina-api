import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('MEXS Argentina')
    .setDescription('API REST Para Mexs Argentina - MdH')
    .setVersion('1.0') 
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://172.23.18.147/', 'Staging') 
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('mexsar-api-documentation', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
