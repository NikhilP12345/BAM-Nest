import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "src/schemas/user.schema";
import { JwtStrategy } from "../JWT/jwt.service";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";

@Module({
    imports: [      
        PassportModule.register({      
            defaultStrategy: 'jwt',      
            property: 'user',      
            session: false,    
        }), 
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ])
    ],  
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy],  
    exports: [PassportModule]
})

export class AuthenticationModule{}