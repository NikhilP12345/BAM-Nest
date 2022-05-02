import { IsInt, IsNotEmpty, IsString, Length, MAX, Max, Min } from "class-validator";
import { Schema } from "mongoose";

export class GetUserDto{
    @IsString()
    @IsNotEmpty()
    @Length(6)
    phoneNumber: string;
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
