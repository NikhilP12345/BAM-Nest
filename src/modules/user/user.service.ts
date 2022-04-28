import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetUserDto, SaveGroupDto, UserDto } from "src/dto/user.dto";
import { IUserGroup } from "src/interfaces/schema.interface";
import { User, UserDocument } from "src/schemas/user.schema";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userModal: Model<UserDocument>
    ){}

    async saveUser(getUserDto: GetUserDto){
        try{
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
        catch(error){
            throw error
        }

    }

    async getUser(getUserDto: GetUserDto){
        return await this.userModal.findOne({
            phone_number: getUserDto.phoneNumber
        })
    }

    async saveGroupToUser(saveGroupDto: IUserGroup, userDto: UserDto){
      
    }

}