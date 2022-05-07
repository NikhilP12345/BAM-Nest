import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { UserLocation, UserLocationSchema } from "src/schemas/userLocation.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: User.name,
        schema: User
    }]), MongooseModule.forFeature([{
        name: UserLocation.name,
        schema: UserLocationSchema
    }])],
    providers: [UserService],
    controllers: [UserController],
    exports: [MongooseModule, UserService]
})
export class UserModule{}