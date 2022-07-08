import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(":id")
  async create(@Param('id') id: string) {
    this.usersService.findOne(id);
  }
}
