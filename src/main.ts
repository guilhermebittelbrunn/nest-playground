import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('HOST_PORT');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Server running at port: ${PORT}`);
}
bootstrap();
