import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const PORT: number = config.get<number>('PORT');


  // handle all user input validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  // app.use(logger);
  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("Server is running.");
  });
}
bootstrap();
