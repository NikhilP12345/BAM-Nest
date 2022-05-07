import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Condition, Model, Types } from "mongoose";
import { GetUserDto, SaveGroupDto, UserDto } from "src/dto/user.dto";
import { IUserGroup } from "src/interfaces/schema.interface";
import { User, UserDocument } from "src/schemas/user.schema";
import { UserLocation, UserLocationDocument } from "src/schemas/userLocation.schema";
import { UserDocI, UserI } from "../authentication/interfaces/authentication.interface";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModal: Model<UserDocument>,
        @InjectModel(UserLocation.name) private locationModal: Model<UserLocationDocument>

    ) { }

    async saveUser(getUserDto: GetUserDto) {
        try {
            const newUser = new this.userModal({
                gender: "Male",
                dateofbirth: new Date(),
                email: "sdfsdefasdsad",
                phone_number: getUserDto.phoneNumber,
                profile_picture: "dsfcdf",
                last_name: "kumawat",
                first_name: "vimal"
            })

            return await newUser.save();
        }
        catch (error) {
            throw error
        }

    }

    async getUser(getUserDto: GetUserDto) {
        return await this.userModal.findOne({
            phone_number: getUserDto.phoneNumber
        })
    }

    async saveGroupToUser(saveGroupDto: IUserGroup, userDto: UserDto) {

    }

    async deleteUserByToken(user: UserDocI): Promise<void> {
        try {
            await this.userModal.deleteOne({
                phone_number: user.phone_number
            });
            await this.locationModal.deleteOne({
                user_id: new Types.ObjectId(user._id) as Condition<User>
            })
            return;
        } catch (error) {
            throw error;
        }
    }

    async getListOfUsersInRadius(latLong: any): Promise<UserI[]>{
        try{
            const users: UserI[] = await this.userModal.find();
            return users;
        }
        catch(error){
            throw error;
        }
    }

}