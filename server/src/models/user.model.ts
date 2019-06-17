import { prop, Typegoose } from "typegoose";

export default class User extends Typegoose {

    @prop({ required: true })
    protected token: string;

    @prop({ required: true })
    protected email: string;

}
export const UserModel = new User().getModelForClass(User, { schemaOptions: { timestamps: true } });
