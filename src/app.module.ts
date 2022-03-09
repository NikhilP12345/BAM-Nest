import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './modules/socket/socket.module';
import config from 'src/config/config'
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MongoModule } from './database/mongo.module';

@Module({
  imports: [
    MongoModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    AuthenticationModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
