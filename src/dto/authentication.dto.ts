import { IsEmail, IsInt, IsNotEmpty, IsNumber, isNumber, IsString, Max, Min } from "class-validator";

export class LoginDTO{

    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNumber()
    @IsNotEmpty()
    dateofbirth: number | Date

    @IsEmail()
    email:string

    @IsInt()
    @IsNotEmpty()
    @Min(10)
    phone_number: number

    @IsNotEmpty()
    @IsString()
    profile_picture: string

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsString()
    first_name: string

    @IsNotEmpty()
    @IsString()
    fcmToken: string

    @IsNotEmpty()
    @IsString()
    firebaseUserId: string
}

export class VerifyUserDto{
    @IsString()
    @IsNotEmpty()
    fcmToken: string

    @IsString()
    @IsNotEmpty()
    firebaseUserId: string

    @IsInt()
    @IsNotEmpty()
    @Min(10)
    phone_number: number
}