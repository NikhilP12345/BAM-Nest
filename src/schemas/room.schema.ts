import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { UserStatusEnum } from "src/enums/user";
import { User } from "./user.schema";

export type RoomDocument = Room & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class Room{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    victim_id: User

    @Prop({required: true, unique: true})
    room_id: string

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    helper_ids: mongoose.Schema.Types.ObjectId[];
}
const RoomSchema = SchemaFactory.createForClass(Room);

export {RoomSchema}