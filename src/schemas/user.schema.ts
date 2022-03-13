import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUserGroup, IUserPlace } from "src/interfaces/schema.interface";

export type UserDocument = User & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class User{

    @Prop()
    first_name: string

    @Prop()
    last_name: string

    @Prop()
    profile_picture: string

    @Prop({unique: true})
    phone_number: number

    @Prop({unique: true})
    email: string

    @Prop()
    dateofbirth: Date

    @Prop()
    gender:string 

    @Prop()
    groups: Array<IUserGroup>

    @Prop()
    places: Array<IUserPlace>


}

export const UserSchema = SchemaFactory.createForClass(User);