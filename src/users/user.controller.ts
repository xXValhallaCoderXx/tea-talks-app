import { Controller, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from '../users/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}


  @Get()
  async getHello() {
    return await this.userService.findOneById(1);
  }
}
