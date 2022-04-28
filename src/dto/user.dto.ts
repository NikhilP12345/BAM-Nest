import { IsInt, IsNotEmpty, IsString, MAX, Max, Min } from "class-validator";
import { Schema } from "mongoose";

export class GetUserDto{
    @IsInt()
    @IsNotEmpty()
    @Min(10)
    @Max(10)
    phoneNumber: number;
}

export class SaveGroupDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @Min(10, {
        each: true
    })
    @Max(10, {
        each: true
    })
    contacts: Array<number>
}


export class UserDto{
    _id: string
    first_name: string;
    last_name: string;
    profile_picture: string;
    phone_number: number;
    email: string;
    dateofbirth: Date;
    gender:string;
}
