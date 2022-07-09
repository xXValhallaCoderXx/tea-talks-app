import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

/*
Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.
*/

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};