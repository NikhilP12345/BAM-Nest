import { User } from "src/schemas/user.schema";

export type UserI =  User & {_id: string}

export interface UserDocI{
    _id: string,
    gender: string,
    dateofbirth: number | string | Date,
    email:string,
    phone_number: number,
    profile_picture: string,
    last_name: string,
    first_name: string,
    fcmToken: string,
    firebaseUserId: string
}