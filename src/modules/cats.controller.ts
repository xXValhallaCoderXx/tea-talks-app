import { Controller, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class CatsController {
  @Get('')
  async login() {
    console.log("HMMM: ", process.env.DATABASE_URL)
    return {
      hello: 's',
    };
  }
}
