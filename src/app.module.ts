import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.entity';
import { CatsModule } from './cats/cats.module';
import { logger } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CatsModule
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   autoLoadModels: true,
    //   synchronize: true,
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT) || 3000,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   models: [User],
    // }),
    // AuthModule,
  ],
  // controllers: [AuthController, AppController],
  // providers: [AuthService, AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes('cats');
  }
}
