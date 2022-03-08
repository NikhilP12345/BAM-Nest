import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { SocketGateway } from './services/socket.service';

@Module({
  providers: [SocketGateway, RoomService],
})
export class SocketModule {}