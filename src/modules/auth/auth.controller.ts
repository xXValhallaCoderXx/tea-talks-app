import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { DoesUserExist } from 'src/guards/doseUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
