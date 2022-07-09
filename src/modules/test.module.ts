import { Controller, Get } from '@nestjs/common';

@Controller('')
export class TestController {
  @Get('')
  async login() {
    return 'Hello';
  }
}
