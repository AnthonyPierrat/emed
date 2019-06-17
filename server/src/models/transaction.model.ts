import { prop, Typegoose } from "typegoose";

export default class Transaction extends Typegoose {

    @prop({ required: true })
    protected key: string;

    @prop({ required: true })
    protected transactionId: string;

}
export const TransactionModel = new Transaction().getModelForClass(Transaction, { schemaOptions: { timestamps: true } });
