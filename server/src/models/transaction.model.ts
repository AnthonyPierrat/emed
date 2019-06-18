import { prop, Typegoose } from "typegoose";

export default class Transaction extends Typegoose {

    @prop({ required: true })
    private _userPublickey: string;

    @prop({ required: true })
    private _transactionId: string;

    get userPublicKey(): string {
        return this._userPublickey;
    }

    get transactionId(): string {
        return this._transactionId;
    }

    set userPublicKey(key: string) {
        this._userPublickey = key;
    }

    set transactionId(transactionId) {
        this._transactionId = transactionId;
    }

}
export const TransactionModel = new Transaction().getModelForClass(Transaction, { schemaOptions: { timestamps: true } });
