import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { logger } from './middleware/logger.middleware';

/*
imports: Other modules that are needed by this module.
exports: By default, modules encapsulate providers. It’s impossible to inject providers that are neither directly part of the current module nor are exported from the imported modules. To make the current module providers available to other modules in the application, they have to be exported here. We can also export modules we imported too.
controllers: The set of controllers defined in this module which have to be instantiated.
providers:in simple terms, all our services and providers within the module will be here.

*/

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3000,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    CatsModule,
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('cats');
  }
}
