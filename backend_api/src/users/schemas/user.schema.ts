import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export default class Users{
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    phoneNumber: number;
    @Prop()
    address: string;
}
export const userSchema =SchemaFactory.createForClass(Users)