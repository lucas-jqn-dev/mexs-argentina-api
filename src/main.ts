import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('mexs/ar/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle('MEXS Argentina')
    .setDescription('API REST Para Mexs Argentina - MdH')
    .setVersion('1.0') 
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('http://172.23.18.147/', 'Staging') 
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('mexsar-api-documentation', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
