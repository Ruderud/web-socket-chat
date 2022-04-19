import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request arrive at middleware, Method: ${req.method}`);
    next(); //next()로 넘겨주지않으면 여기서 정지된 상태. => timeout 유발
  }
}

@Injectable()
export class LoggerMiddleware2nd implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`this is second Middleware, Method: ${req.method && 'none'}`);
    next();
  }
}
