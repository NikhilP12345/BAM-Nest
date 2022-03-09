import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDTO } from "src/dto/authentication.dto";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class AuthService{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtTokenService: JwtService
    ){}
    
    async validateUserCredentials(loginDto: LoginDTO){
        const matchQuery = {
            'phone_number': loginDto.phone_number
        }
        const user = await this.userModel.findOne(matchQuery)
        if(user){

        }
        return null;
    }

    async loginWithCredentials(loginDto: LoginDTO): Promise<any>{
        const matchQuery = {
            'phone_number':  loginDto.phone_number
        }
        const user = await this.userModel.findOne(matchQuery);
        if(user){
            return {
                access_token: this.jwtTokenService.sign(user),
            };
        }
        else{

        }
    }

}