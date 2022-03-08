import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import {Cache} from 'cache-manager'
import { CreateRoomDto, IsSafeDto, UpdateLocationDto } from "../dto/socket.dto";
import { ICacheData } from "../interfaces/cache.interface";
import * as Redis from 'ioredis'

@Injectable()
export class RoomService{
    private redis: any;
    constructor(
        // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    )
    {
        this.redis = new Redis({
            host: 'redis-10411.c264.ap-south-1-1.ec2.cloud.redislabs.com',
            port: 10411,
            password: 'socketManagment' 
        });
    }

    async createRoomToCache(socketId: string, roomId: string, createRoomDto: CreateRoomDto): Promise<any>{
        try{
            const getCacheUser: ICacheData	= await this.getDataFromCache(createRoomDto.uid)
            if(getCacheUser){
                throw new Error("User already Victim")
            }
            const savedCache: ICacheData = {
                socketId,
                roomId,
                location: createRoomDto.location,
                type: createRoomDto.type
            }
            await this.setDataToCache(createRoomDto.uid, savedCache);
            // inform nearby users
        }
        catch(error){
            throw error
        }
    }


    async updateLocationToCache(socketId: string, updateLocationDto: UpdateLocationDto){
        try{
            const getCacheUser: ICacheData = await this.getDataFromCache(updateLocationDto.uid);
            if(!getCacheUser){
                throw new Error("User not available in cache") 
            }
            if(getCacheUser.roomId !== updateLocationDto.roomId || getCacheUser.socketId !== socketId){
                throw new Error("User already connected in a different roomId")
            }
            getCacheUser.location = updateLocationDto.location
            await this.setDataToCache(updateLocationDto.uid, getCacheUser);
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
            await this.redis.set(key, JSON.stringify(value));
        }
        catch(error){
            throw new Error('Cant set value to cache')
        }
    }
}