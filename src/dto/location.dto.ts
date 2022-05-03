import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LocationDto{

    @IsNumber()
    @IsNotEmpty()
    latitude: number

    @IsNumber()
    @IsNotEmpty()
    longitude: number
}