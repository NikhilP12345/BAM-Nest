import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";

export type GroupDocument = Group & Document

@Schema({
    timestamps:{
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
})

export class Group{

    @Prop()
    name: string

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user_id: MongooseSchema.Types.ObjectId;

    @Prop([{type: MongooseSchema.Types.ObjectId, ref: 'User'}])
    contact_ids: MongooseSchema.Types.ObjectId[];

}
const GroupSchema = SchemaFactory.createForClass(Group);
GroupSchema.index({name: 1, user_id: 1}, {name: "name_user_id_index", unique: true});

export {GroupSchema}

