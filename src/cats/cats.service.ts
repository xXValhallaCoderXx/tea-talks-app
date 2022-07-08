/*
This service will be responsible for data storage and retrieval, and is designed to be used by the CatsController, so it's a good candidate to be defined as a provider.
*/

import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    console.log("CAT", cat)
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
