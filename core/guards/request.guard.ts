import { Injectable, CanActivate, ExecutionContext, SetMetadata, OnModuleInit, Inject } from '@nestjs/common';
import axios from 'axios';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { JwtAuth } from 'core/helpers/jwt_helper';
import { isUndefined } from 'core/utils/common';
import { AuthService } from 'src/modules/authentication/authentication.service';

@Injectable()
export class RequestGaurd implements CanActivate{
  constructor(
    private readonly reflector: Reflector,
    @Inject() private readonly jwt : JwtAuth,
    private readonly authService: AuthService

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
    return await this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    const headers: Object = request.headers;


    if (isUndefined(headers)) {
      return false;
    }
    const jwtToken: string = request.headers.by_pass;
    
    if (isUndefined(jwtToken)){
      return false;
    }

    const isValid: boolean =  await this.jwt.validateJwt(jwtToken);
    if(!isValid){
      return false;
    }
    const validationResponse: Object = await this.authService.validateUserCredentials(jwtToken);
    request.user = validationResponse;
    if (isUndefined(validationResponse)) {
      return false;
    }
    return true;
  }
}
