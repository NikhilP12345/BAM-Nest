import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Condition, Model, Types } from "mongoose";
import { LocationDto } from "src/dto/location.dto";
import { TriggerLevelToMile } from "src/enums/location";
import { User } from "src/schemas/user.schema";
import { UserLocation, UserLocationDocument } from "src/schemas/userLocation.schema";
import { UserI } from "../authentication/interfaces/authentication.interface";
import { CreateRoomDto } from "../socket/dto/socket.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class LocationService{
    constructor(
        @InjectModel(UserLocation.name) private locationModal: Model<UserLocationDocument>,
    ){}

    async updateUserLocationById(user: UserI, locationDto: LocationDto): Promise<void>{
        try{
            await this.locationModal.findOneAndUpdate({user_id: user._id as Condition<User>}, {
                latitude: locationDto.latitude,
                longitude: locationDto.longitude
            }, {new: true, upsert: true})
        }
        catch(error){
            throw error
        }

    }

    async getListOfNearbyUsersByLocation(createRoomDto: CreateRoomDto, user: UserI): Promise<any>{    
        try{
            const boundaryLocation = this.getGeohashRange(createRoomDto.location.latitude, createRoomDto.location.longitude, TriggerLevelToMile[createRoomDto.level.toString()]);
            return boundaryLocation;
        }    
        catch(error){
            throw error;
        }
    }

    
    getGeohashRange = (latitude: number, longitude: number, distance: number): Record<string, any> => {
        
        const lat: number = 0.0144927536231884; // degrees latitude per mile
        const lon: number = 0.0181818181818182; // degrees longitude per mile

        const lowerLat: number = latitude - lat * distance;
        const lowerLon: number = longitude - lon * distance;

        const upperLat: number = latitude + lat * distance;
        const upperLon: number = longitude + lon * distance;

        return {
            lowerLocation: {lowerLat, lowerLon},
            upperLocation: {upperLat, upperLon}
        };
    }
}



