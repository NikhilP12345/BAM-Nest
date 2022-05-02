import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './modules/socket/socket.module';
import config from 'src/config/config'
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MongoModule } from './database/mongo.module';
import { UserModule } from './modules/user/user.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    MongoModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    AuthenticationModule,
    UserModule,
    LocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
