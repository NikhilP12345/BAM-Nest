import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './modules/socket/socket.module';
import config from 'src/config/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    AuthenticationModule,
    MongooseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
