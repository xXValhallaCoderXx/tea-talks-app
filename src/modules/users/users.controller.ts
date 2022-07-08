import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async fetchAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async fetchOne(@Param('id') id: string) {
    return this.usersService.findOneById(parseInt(id));
  }

  @Post()
  async signUp(@Body() user: User) {
    return await this.usersService.create(user);
  }
}
