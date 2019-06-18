import { prop, Typegoose } from "typegoose";
import { UserType } from "../enums/user-type.enum";

export default class User extends Typegoose {

    @prop({ required: true })
    private _publicKey: string;

    @prop({ required: true })
    private _email: string;

    @prop({ required: true })
    private _hashPrivateKey: string;

    @prop({ required: true })
    private _hashPassword: string;

    @prop({ required: true, enum: UserType })
    private _type: UserType;

    constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }

    @prop()
    get publicKey(): string {
        return this._publicKey;
    }

    @prop()
    get email(): string {
        return this._email;
    }

    @prop()
    get hashPrivateKey(): string {
        return this._hashPrivateKey;
    }

    @prop()
    get hashPassword(): string {
        return this._hashPassword;
    }

    @prop()
    get type(): UserType {
        return this._type;
    }

    set publicKey(newPublicKey: string) {
        this._publicKey = newPublicKey;
    }

    set email(newEmail: string) {
        this._email = newEmail;
    }

    set hashPrivateKey(newPrivateKey: string) {
        this._hashPrivateKey = newPrivateKey;
    }

    set hashPassword(newPassword: string) {
        this._hashPassword = newPassword;
    }

    set type(newType: UserType) {
        this._type = newType;
    }

}
export const UserModel = new User().getModelForClass(User, { schemaOptions: { timestamps: true } });
