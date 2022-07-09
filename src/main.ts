import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());
  // app.use(logger);
  await app.listen(PORT);
}
bootstrap();
