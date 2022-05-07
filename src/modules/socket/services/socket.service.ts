import { CACHE_MANAGER, ForbiddenException, Inject } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SOCKETEVENTLISTENER } from "src/constants";
import { CreateRoomDto, IncreaseRangeDto, IsSafeDto, UpdateCameraPositionDto, UpdateLocationDto } from "../dto/socket.dto";
import { RoomService } from "./room.service";
import { uuid } from "uuidv4";
import { Socket } from "dgram";
import { AuthService } from "src/modules/authentication/authentication.service";
import { UserDocI, UserI } from "src/modules/authentication/interfaces/authentication.interface";


@WebSocketGateway({allowRequest: async (req, fn) => {
  const token: string = req.headers["by_pass"];
  if(!token){
    fn(`Wrong headers`, false)
  }
  fn(null, true);
}})

export class SocketGateway {
  @WebSocketServer() server;

  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService
  )
  {}

    @SubscribeMessage(SOCKETEVENTLISTENER.CREATE_ROOM)
    async createRoom( @ConnectedSocket() client: Socket, @MessageBody() createRoomDto: CreateRoomDto): Promise<any> {
      try{
        const user: UserI = await this.authService.authenticateSocket(client);
        if(!user){
          throw new ForbiddenException(`Wrong headers pass`);
        }
        const userAvailableNearby: number = await this.roomService.createRoomForVictim(user, createRoomDto);
        client.emit(SOCKETEVENTLISTENER.CREATE_ROOM, `Total Available Users - ${userAvailableNearby}`);

      }
      catch(error){
        client.emit(SOCKETEVENTLISTENER.CREATE_ROOM, error.message || `Wrong JWT Token passed`);
      }

    }


    @SubscribeMessage(SOCKETEVENTLISTENER.UPDATE_LOCATION)
    async updateUserLocation(@ConnectedSocket() client: Socket, @MessageBody() updateLocationDto: UpdateLocationDto): Promise<void> {
      try{
        const user: UserI = await this.authService.authenticateSocket(client);
        if(!user){
          throw new ForbiddenException(`Wrong headers pass`);
        }
        await this.roomService.updateLocationToCache(user, updateLocationDto);
        client.emit(SOCKETEVENTLISTENER.UPDATE_LOCATION, `Location Updated successfully`);

      }
      catch(error){
        client.emit(SOCKETEVENTLISTENER.UPDATE_LOCATION, error.message || `Wrong JWT Token passed`);
      }
    }


    @SubscribeMessage(SOCKETEVENTLISTENER.UPDATE_CAMERA_POSITION)
    updateCameraPosition(@MessageBody() message: UpdateCameraPositionDto): void {

    }

    @SubscribeMessage(SOCKETEVENTLISTENER.IS_SAFE)
    iSafe(@MessageBody() isSafeDto: IsSafeDto): void {
        try{
          this.roomService.roomSafe(isSafeDto)
        }
        catch(error){
          throw error;
        }
    }

    @SubscribeMessage(SOCKETEVENTLISTENER.INCREASE_RANGE)
    increaseRange(@MessageBody() message: IncreaseRangeDto): void {
    }
}