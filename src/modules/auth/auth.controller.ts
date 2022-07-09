import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() params) {

    console.log("PARAMS: ", params)
    return await this.authService.validateUser(params.email, params.password);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
      return await this.authService.create(user);
  }
}
