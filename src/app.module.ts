import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // AuthModule,
    // UsersModule,
    DatabaseModule,
  ],
  // controllers: [AuthController, AppController],
  // providers: [AuthService, AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
