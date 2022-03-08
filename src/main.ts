import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: true})
  const configService = app.get(ConfigService)
  console.log(`Listening on ${configService.get('port')} port`)
  await app.listen(3000);
}
bootstrap();
