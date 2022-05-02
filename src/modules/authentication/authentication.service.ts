import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDTO, VerifyUserDto } from "src/dto/authentication.dto";
import { User, UserDocument } from "src/schemas/user.schema";
import { FirebaseService } from "./firebase.service";
import { UserDocI, UserI } from "./interfaces/authentication.interface";

@Injectable()
export class AuthService{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtTokenService: JwtService,
        private readonly configService : ConfigService,
        private readonly firebaseService: FirebaseService
    ){}
    
    async validateUserCredentials(jwtToken: string): Promise<UserI>{        
        const decodedUser: UserDocI  = await this.jwtTokenService.decode(jwtToken) as UserDocI;
        const matchQuery = {
            'phone_number': decodedUser.phone_number
        }
        const user: UserI = await this.userModel.findOne(matchQuery);
        return user;
    }

    async saveUserCredentials(loginDto: LoginDTO): Promise<any>{
        try{
            const existingUserDoc: UserI = await this.userModel.findOne({
                firebase_id: loginDto.firebaseUserId,
                phone_number: loginDto.phone_number
            });
            if(existingUserDoc){
                return {
                    message: 'User already there'
                }
            }
            loginDto.dateofbirth = new Date(loginDto.dateofbirth);
            const userDoc = new this.userModel({
                gender: loginDto.gender,
                dateofbirth: loginDto.dateofbirth,
                email:loginDto.email,
                phone_number: loginDto.phone_number,
                profile_picture: loginDto.profile_picture,
                last_name: loginDto.last_name,
                first_name: loginDto.first_name,
                fcm_token: loginDto.fcmToken,
                firebase_id: loginDto.firebaseUserId
            });
            const savedUserDoc: UserI = await userDoc.save();
            const userPayload: UserDocI = {
                ...loginDto,
                _id: savedUserDoc._id
            }
            return await this.convertUserToJWT(userPayload)
        }
        catch(error){
            throw error
        }
    }


    async verifyUser(verifyUserDto: VerifyUserDto): Promise<Record<string, string> | any>{
        try{
            const user: UserI & {_id: string} =  await this.userModel.findOne({
                firebase_id: verifyUserDto.firebaseUserId,
                phone_number: verifyUserDto.phone_number
            });
           if(!user){
               return {
                   accessToken: null,
                   message: 'User not there'
               }
           }
    
    
            await this.userModel.findOneAndUpdate({
                firebase_id: verifyUserDto.firebaseUserId,
                phone_number: verifyUserDto.phone_number
            }, {
                fcm_token: verifyUserDto.fcmToken
            })
    
            const userPayload: UserDocI = {
                _id: user._id,
                gender: user.gender,
                dateofbirth: user.dateofbirth.toString(),
                email: user.email,
                phone_number: user.phone_number,
                profile_picture: user.profile_picture,
                last_name: user.last_name,
                first_name: user.first_name,
                fcmToken: verifyUserDto.fcmToken,
                firebaseUserId: user.firebase_id
            }
            return await this.convertUserToJWT(userPayload)    
        }
        catch(error){
            throw error
        }
    }

    async convertUserToJWT(userPayload: UserDocI): Promise<Record<string, string>>{
        try{
            return {
                access_token: await this.jwtTokenService.signAsync(
                    userPayload,
                    {secret: await this.configService.get('jwtSecretKey'),
                    expiresIn : await this.configService.get('jwtExpiresIn')
                    },
                ),
            };
        }
        catch(error){
            throw error
        }

    }

    

}
