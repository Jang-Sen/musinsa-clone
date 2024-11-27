import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Port
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT') ?? 7070;

  app.setGlobalPrefix('api'); // url api 추가

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Musinsa-Clone API')
    .setDescription('무신사 클론 API')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-swagger', app, documentFactory);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
    }),
  );

  // Transformer(민감한 데이터 숨기기)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port);
}

bootstrap();
