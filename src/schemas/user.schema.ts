import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenderEnum } from "src/enums/user";

export type UserDocument = User & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class User{

    @Prop({unique: true, required: true})
    firebase_id: string

    @Prop({required: true})
    fcm_token: string

    @Prop({required:true})
    first_name: string

    @Prop({required:true})
    last_name: string

    @Prop()
    profile_picture: string

    @Prop({unique: true, required: true})
    phone_number: number

    @Prop({unique: true, required: true})
    email: string

    @Prop({required: true})
    dateofbirth: Date

    @Prop({required: true, enum: GenderEnum})
    gender:string 

}
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({phone_number: 1}, {name: "phone_number_index", unique: true});

export {UserSchema}