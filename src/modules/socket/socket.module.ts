import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schemas/room.schema';
import { UserStatus, UserStatusSchema } from 'src/schemas/userStatus.schema';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthService } from '../authentication/authentication.service';
import { FirebaseService } from '../authentication/firebase.service';
import { LocationModule } from '../location/location.module';
import { LocationService } from '../location/location.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RoomService } from './services/room.service';
import { SocketGateway } from './services/socket.service';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
        {name: UserStatus.name, schema: UserStatusSchema}
    ]),
    MongooseModule.forFeature([
      {name: Room.name, schema: RoomSchema}
    ]),
    LocationModule,
    UserModule
  ],
  providers: [SocketGateway, RoomService, AuthService, LocationService, UserService, FirebaseService],
})
export class SocketModule {}