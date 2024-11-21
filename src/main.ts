import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Port
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT') ?? 7070;

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Musinsa-Clone API')
    .setDescription('무신사 클론 API')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-swagger', app, documentFactory);

  await app.listen(port);
}

bootstrap();
