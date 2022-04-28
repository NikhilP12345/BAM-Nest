import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JWT } from "src/constants";
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";
import { FirebaseService } from "./firebase.service";

@Module({
    imports: [      
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
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
    exports: [PassportModule]
})

export class AuthenticationModule{}