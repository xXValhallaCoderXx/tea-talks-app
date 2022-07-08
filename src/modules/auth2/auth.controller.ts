import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  
  @Post('login')
  async login(@Body() params) {
    return await this.authService.login(params);
  }

//   @Post('signup')
//   async signUp(@Body() user: User) {
//     return await this.authService.create(user);
//   }
}
