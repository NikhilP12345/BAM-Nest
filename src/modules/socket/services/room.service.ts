import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import Cache from 'cache-manager';
import { CreateRoomDto, IsSafeDto, LocationDto, UpdateLocationDto, VictimDto } from "../dto/socket.dto";
import { ICacheData } from "../interfaces/cache.interface";
import * as Redis from 'ioredis'
import { AuthService } from "src/modules/authentication/authentication.service";
import { UserI } from "src/modules/authentication/interfaces/authentication.interface";
import { uuid } from "uuidv4";
import { InjectModel } from "@nestjs/mongoose";
import { UserStatus, UserStatusDocument, UserStatusSchema } from "src/schemas/userStatus.schema";
import { Condition, Model, Types } from "mongoose";
import { UserStatusEnum } from "src/enums/user";
import { Room, RoomDocument } from "src/schemas/room.schema";
import { ObjectId } from "bson";
import { LocationService } from "src/modules/location/location.service";
import { UserService } from "src/modules/user/user.service";
import { FirebaseService } from "src/modules/authentication/firebase.service";

@Injectable()
export class RoomService{
    constructor(
        @Inject(CACHE_MANAGER) private readonly redis: Cache,
        @InjectModel(UserStatus.name) private userStatusModel: Model<UserStatusDocument>,
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        private readonly locationService: LocationService,
        private readonly userService: UserService,
        private readonly firebaseService: FirebaseService
    )
    {}

    async createRoomForVictim(user: UserI, createRoomDto: CreateRoomDto): Promise<number>{
        try{
            const roomId: string = uuid();
            const victimId: ObjectId = user._id as unknown as ObjectId
            await this.createNewRoomInDb(victimId, roomId, createRoomDto);
            await this.locationService.updateUserLocationById(user, createRoomDto.location);
            const radiusAroundLevel: any = await this.locationService.getListOfNearbyUsersByLocation(createRoomDto, user);
            const possibleHelpersList: Array<UserI> = await this.userService.getListOfUsersInRadius(radiusAroundLevel);
            const listFcmTokens: string[] = [];
            possibleHelpersList.forEach(user => {
                listFcmTokens.push(user.fcm_token);
            })
            await this.firebaseService.notifyUserThroughNotification(listFcmTokens, {
                name: user.first_name + " " + user.last_name,
                roomId: roomId,
                latitude: createRoomDto.location.latitude,
                longitude: createRoomDto.location.longitude
            });          
            await this.setDataToCache(user._id.toString(), createRoomDto.location);
            return possibleHelpersList.length;
        }
        catch(error){
            throw error
        }
    }

    async createNewRoomInDb(victimId: ObjectId,  roomId: string, createRoomDto: CreateRoomDto): Promise<void>{
        try{
            
            const currentUser: UserStatus = await this.userStatusModel.findOne({user_id:  victimId as Condition<UserI>});

            if(!currentUser || (currentUser && currentUser.status != UserStatusEnum.USER)){
                throw new Error(`Current User Status is not USER, its already - ${currentUser.status}`)
            }
            await this.userStatusModel.findOneAndUpdate({
                    user_id:  victimId as Condition<UserI> 
                },
                {status: UserStatusEnum.VICTIM}
            )
    
            const newRoom = new this.roomModel({
                victim_id: victimId,
                helper_ids: [],
                room_id: roomId
            })
            const savedRoom: Room = await newRoom.save();


        }
        catch(error){
            throw error
        }
    }

    async updateLocationToCache(user: UserI, updateLocationDto: UpdateLocationDto){
        try{
            const userId: string = user._id.toString()
            let getCacheUser: LocationDto = await this.getDataFromCache(userId);
            if(!getCacheUser){
                throw new Error("User not available in cache") 
            }
            getCacheUser = updateLocationDto.location
            await this.setDataToCache(userId, getCacheUser);
        }
        catch(error){
            throw error
        }
    }

    async roomSafe(isSafe: IsSafeDto){
        try{
            console.log("hrllo")
            const victim: any = await this.getDataFromCache('*');
            console.log(victim)
            // if(!victim){
            //     throw new Error("Victim is not present")
            // }

        }
        catch(error){
            throw error
        }
    }

    async getVictimLocation(user: UserI, victimDto: VictimDto): Promise<LocationDto>{
        try{
            const victimId: string = victimDto._id.toString()
            let getCacheUser: LocationDto = await this.getDataFromCache(victimId);
            if(!getCacheUser){
                throw new Error("Victim Id not available in cache") 
            }
            return getCacheUser;
        }
        catch(error){
            throw error
        }
    }

    async getDataFromCache(key: string): Promise<any>{
        try{            
            const value: string = await this.redis.get(key);
            return JSON.parse(value);
        }
        catch(error){
            throw new Error(`Cant get value from cache`)
        }
    }

    async setDataToCache(key: string, value: any): Promise<void>{
        try{
            await this.redis.set(key, JSON.stringify(value), {ttl: 0});
        }
        catch(error){            
            throw new Error('Cant set value to cache')
        }
    }

    async deleteFromCache(key: string): Promise<void>{
        try{           
            await this.redis.del(key);
        }
        catch(error){            
            throw new Error(`Cant delete value from cache`)
        }
    }

    async disconnectVictim(user: UserI): Promise<any> {
        try{
            await this.userStatusModel.findOneAndUpdate({
                user_id: user._id as Condition<UserI> 
            },{
                status: UserStatusEnum.USER
            });
            await this.deleteFromCache(user._id.toString())
        }
        catch(error){
            throw error;
        }
    }
}