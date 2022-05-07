import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

export type UserLocationDocument = UserLocation & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class UserLocation{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true,  unique: true})
    user_id: User

    @Prop({unique: true, required: true})
    latitude: number

    @Prop({unique: true, required: true})
    longitude: number

}
const UserLocationSchema = SchemaFactory.createForClass(UserLocation);

export {UserLocationSchema}