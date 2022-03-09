import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from './requestContext';

@Injectable()
export class RequestContextMidleware implements NestMiddleware {
  use(req: Request, res: Response, next:()=>void) {
    RequestContext.localStorage.run(new RequestContext(), next);
  }
}
