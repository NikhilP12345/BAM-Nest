import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserLocation, UserLocationSchema } from "src/schemas/userLocation.schema";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: UserLocation.name,
        schema: UserLocationSchema
    }])],
    providers: [LocationService],
    controllers: [LocationController]
})
export class LocationModule{}