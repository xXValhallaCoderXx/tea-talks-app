import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateCatDto } from './cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { ForbiddenCustomException } from 'src/middleware/exceptions.middleware';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('profile')
  findMore() {
    return { hello: 'world' };
  }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
//   @Get(':id')
//   findOne(@Param('id') params): string {
//     console.log(params.id);
//     return `This action returns a #${params.id} cat`;
//   }
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('error')
  async errorFindAll() {
    throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN);
  }

  @Get('error2')
  async customError() {
    throw new ForbiddenCustomException();
  }

  //   @Get(':id')
  //   findOne(@Param("id") id: string): string {
  //     console.log(id);
  //     return `This action returns a #${id} cat`;
  //   }

  //   @Get()
  //   findAll(): string {
  //     return 'This action returns all cats';
  //   }
}
