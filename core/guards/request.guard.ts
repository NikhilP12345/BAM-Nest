import { Injectable, CanActivate, ExecutionContext, SetMetadata, OnModuleInit, Inject } from '@nestjs/common';
import axios from 'axios';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { JwtAuth } from 'core/helpers/jwt_helper';
import { isUndefined } from 'core/utils/common';

@Injectable()
export class RequestGaurd implements CanActivate{
  constructor(
    private readonly reflector: Reflector,
    @Inject() private readonly jwt : JwtAuth
  ){    
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    const requestUrl = request.url;
    const headers: Object = request.headers;


    if (isUndefined(headers)) {
      return false;
    }
    const jwtToken: string = request.headers.jwt_token;
    if (!isUndefined(jwtToken)){
      return await this.jwt.validateJwt(jwtToken);
    }
    return true;
  }
}
