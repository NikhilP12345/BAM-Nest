import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { UserStatusEnum } from "src/enums/user";
import { User } from "./user.schema";

export type UserStatusDocument = UserStatus & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class UserStatus{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,  unique: true })
    user_id: User

    @Prop({required: true})
    status: UserStatusEnum
}
const UserStatusSchema = SchemaFactory.createForClass(UserStatus);

export {UserStatusSchema}