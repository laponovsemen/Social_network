import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ versionKey: true, timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    login: string;
    @Prop({ type: String, required: true })
    email: string;
    @Prop({ type: String, required: true })
    passwordHash: string;
    @Prop({ type: Boolean || null })
    isConfirmed: boolean;
}

export type UsersDocument = HydratedDocument<User>;
export const UsersSchema = SchemaFactory.createForClass(User);
