import { validate } from "class-validator";
import { Request, Response } from "express";
import bddOrm from "../bigchain/bigchain-orm";
import { UserType } from "../enums/user-type.enum";
import Record from "../models/record.model";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";

export default class AuthController {

    constructor() { }

    public async addTransaction(req: Request, res: Response) {
        // retrieve data
        const record: Record = new Record(req.body.data);
        const recordValidation = await validate(record);
        if (recordValidation.length > 0) {
            res.status(500).send(recordValidation);
        } else {
            // generate key
            const userPublicKey = req.body.publicKey;
            // create asset and save transaction for history
            const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });
            const user = await UserModel.findOne({ _publicKey: userPublicKey });
            try {
                bddOrm.models.user
                    .retrieve(transaction.transactionId)
                    .then((assets: any) => {
                        if (assets.length) {
                            assets[0].append({ toPublicKey: userPublicKey, keypair: { publicKey: user.publicKey, privateKey: user.hashPrivateKey }, data: { record } });
                        } else {
                            res.status(404).send("No assets to update");
                        }
                    })
                    .then((updatedAsset: any) => {
                        res.status(200).send({ success: true, message: "Asset successfully updated", data: updatedAsset });
                    });
            } catch (err) {
                res.status(500).send("Something went wrong");
            }
        }
    }

    public async getTransactionsByPublicKey(req: Request, res: Response) {
        // retrieve data
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });

        if (transaction) {
            const result = await bddOrm.models.user.retrieve(transaction.transactionId);
            res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: result });
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }

    public async getTransactionsCanSee(req: Request, res: Response) {
        // retrieve data
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });

        // check if transactions exist
        if (transaction) {
            const result = await bddOrm.models.user.retrieve();
            const allowedTransactions: any[] = [];
            // check wether the current pbk exist in blockchain assets
            result.forEach((asset) => {
                if (asset.data.record._canSee.includes(userPublicKey)) {
                    allowedTransactions.push(asset);
                }
            });
            res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: allowedTransactions });
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }
}
