import { IsEmail, IsInt, IsNotEmpty, IsNumber, isNumber, IsString, Length, Max, Min } from "class-validator";

export class LoginDTO{

    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNumber()
    @IsNotEmpty()
    dateofbirth: number | Date

    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    @Length(6)
    phone_number: string

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

    @IsString()
    @IsNotEmpty()
    @Length(10)
    phone_number: string
}