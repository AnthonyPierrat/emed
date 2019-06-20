import { prop, Typegoose } from "typegoose";

export default class Transaction extends Typegoose {

    @prop({ required: true })
    private _userPublicKey: string;

    @prop({ required: true })
    private _transactionId: string;

    @prop()
    get userPublicKey(): string {
        return this._userPublicKey;
    }

    @prop()
    get transactionId(): string {
        return this._transactionId;
    }

    set userPublicKey(key: string) {
        this._userPublicKey = key;
    }

    set transactionId(transactionId) {
        this._transactionId = transactionId;
    }

}
export const TransactionModel = new Transaction().getModelForClass(Transaction, { schemaOptions: { timestamps: true } });
