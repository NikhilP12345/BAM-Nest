import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './modules/socket/socket.module';
import config from 'src/config/config'
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MongoModule } from './database/mongo.module';
import { UserModule } from './modules/user/user.module';
import { LocationModule } from './modules/location/location.module';
import * as RedisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongoModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
          store: RedisStore,
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
          isGlobal: true,
      }),
      inject: [ConfigService],
  }),

    AuthenticationModule,
    UserModule,
    LocationModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
