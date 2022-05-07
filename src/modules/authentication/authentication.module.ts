import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JWT } from "src/constants";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserStatus, UserStatusSchema } from "src/schemas/userStatus.schema";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";
import { FirebaseService } from "./firebase.service";

@Global()
@Module({
    imports: [      
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        MongooseModule.forFeature([
            {name: UserStatus.name, schema: UserStatusSchema}
        ]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwtSecretKey'),
                signOptions: {expiresIn: configService.get('jwtExpiresIn')}
            }),
            inject: [ConfigService]
        }),
        FirebaseService
    ],  
    controllers: [AuthController],  
    providers: [AuthService, FirebaseService],  
    exports: [PassportModule, MongooseModule, AuthService, JwtModule, FirebaseService]
})

export class AuthenticationModule{}