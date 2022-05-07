import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserLocation, UserLocationSchema } from "src/schemas/userLocation.schema";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: UserLocation.name,
        schema: UserLocationSchema
    }])
],
    providers: [LocationService],
    controllers: [LocationController],
    exports: [MongooseModule, LocationService]
})
export class LocationModule{}