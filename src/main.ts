import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RequestGaurd } from 'core/guards/request.guard';
import { JwtAuth } from 'core/helpers/jwt_helper';
import { AppModule } from './app.module';
import ResponseInterceptor from '../core/interceptors/response'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: true})
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.useGlobalGuards(new RequestGaurd(reflector, new JwtAuth(jwtService,configService)));
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3000);
  console.log(`Listening on ${configService.get('port')} port`)
}
bootstrap();
