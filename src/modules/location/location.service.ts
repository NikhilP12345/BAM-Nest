import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Condition, Model, Types } from "mongoose";
import { LocationDto } from "src/dto/location.dto";
import { User } from "src/schemas/user.schema";
import { UserLocation, UserLocationDocument } from "src/schemas/userLocation.schema";
import { UserI } from "../authentication/interfaces/authentication.interface";

@Injectable()
export class LocationService{
    constructor(
        @InjectModel(UserLocation.name) private locationModal: Model<UserLocationDocument>
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

}
