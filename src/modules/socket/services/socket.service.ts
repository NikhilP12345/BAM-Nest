import { CACHE_MANAGER, ForbiddenException, Inject } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SOCKETEVENTLISTENER } from "src/constants";
import { CreateRoomDto, IncreaseRangeDto, IsSafeDto, LocationDto, UpdateCameraPositionDto, UpdateLocationDto, VictimDto } from "../dto/socket.dto";
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

    // @SubscribeMessage(SOCKETEVENTLISTENER.JOIN_ROOM)
    // async userJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() updateLocationDto: UpdateLocationDto): Promise<void> {
    //   try{
    //     const user: UserI = await this.authService.authenticateSocket(client);
    //     if(!user){
    //       throw new ForbiddenException(`Wrong headers pass`);
    //     }
    //     await this.roomService.updateLocationToCache(user, updateLocationDto);
    //     client.emit(SOCKETEVENTLISTENER.UPDATE_LOCATION, `Location Updated successfully`);

    //   }
    //   catch(error){
    //     client.emit(SOCKETEVENTLISTENER.UPDATE_LOCATION, error.message || `Wrong JWT Token passed`);
    //   }
    // }

    @SubscribeMessage(SOCKETEVENTLISTENER.DISCONNECT_BY_VICTIM)
    async disconnectSocketByVictim(@ConnectedSocket() client: Socket): Promise<void> {
      try{
        const user: UserI = await this.authService.authenticateSocket(client);
        if(!user){
          throw new ForbiddenException(`Wrong headers pass`);
        }
        await this.roomService.disconnectVictim(user);
        client.emit(SOCKETEVENTLISTENER.DISCONNECT_BY_VICTIM, "ROOM CLOSED");

      }
      catch(error){
        client.emit(SOCKETEVENTLISTENER.DISCONNECT_BY_VICTIM, error.message || `Wrong JWT Token passed`);
      }
    }
    
    @SubscribeMessage(SOCKETEVENTLISTENER.VICTIM_LOCATION)
    async getVictimLocation(@ConnectedSocket() client: Socket, @MessageBody() victimDto: VictimDto): Promise<void> {
      try{
        const user: UserI = await this.authService.authenticateSocket(client);
        if(!user){
          throw new ForbiddenException(`Wrong headers pass`);
        }
        const victimLocation: LocationDto = await this.roomService.getVictimLocation(user, victimDto);
        client.emit(SOCKETEVENTLISTENER.VICTIM_LOCATION, victimLocation);

      }
      catch(error){
        client.emit(SOCKETEVENTLISTENER.VICTIM_LOCATION, error.message || `Wrong JWT Token passed`);
      }
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