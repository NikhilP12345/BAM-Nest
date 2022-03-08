import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class User{
    @Prop()
    _id: string

    @Prop()
    profile_picture: string

    @Prop()
    phone_number: number

    @Prop()
    email: string

    @Prop()
    dateofbirth: Date

}

export const UserSchema = SchemaFactory.createForClass(User);