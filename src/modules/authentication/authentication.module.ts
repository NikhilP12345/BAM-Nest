import { Module } from "@nestjs/common";
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
        JwtModule.register({
          secret: JWT.SECRET,
          signOptions: {expiresIn: '60s'}
        }),
        FirebaseService
    ],  
    controllers: [AuthController],  
    providers: [AuthService, FirebaseService],  
    exports: [PassportModule]
})

export class AuthenticationModule{}