import { IsNotEmpty, IsString } from "class-validator"

export class LocationDto{

    @IsString()
    @IsNotEmpty()
    latitude: string

    @IsString()
    @IsNotEmpty()
    longitude: string
}