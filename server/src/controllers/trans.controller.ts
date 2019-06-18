import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import bddOrm from "../bigchain/bigchain-orm";
import { UserType } from "../enums/user-type.enum";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";

export default class AuthController {

    constructor() { }

    public async transaction(req: Request, res: Response) {
        const type: UserType = req.body.type;
        // retrieve data
        const record: any = req.body.data;
        // generate key
        const userPublicKey = req.body.publicKey;
        // create asset and save transaction for history
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey});
        const user = await UserModel.findOne({ _publicKey: userPublicKey});
        try {
            // bddOrm.models.user
            // .retrieve(transaction.transactionId)
            // .then((asset) => { 
            //     asset.append({ toPublicKey: userPublicKey, keypair: {publicKey: user.publicKey, privateKey: user.hashPrivateKey}, data: record});
            // })
            // .then(updatedAsset => {
            //     console.log(updatedAsset.data)
            // })

            const retrieving = await bddOrm.models.user.retrieve(transaction.transactionId)
            console.log(bddOrm.models.user.append({ toPublicKey: userPublicKey, keypair: {publicKey: user.publicKey, privateKey: user.hashPrivateKey}, data: record}))
            const data = await bddOrm.models.user.append({ toPublicKey: userPublicKey, keypair: {publicKey: user.publicKey, privateKey: user.hashPrivateKey}, data: record});
            res.status(201).send({ success: true, message: "Asset successfully updated"});
         } catch (err) {
            res.status(500).send("Something went wrong");
        }
        }
    }
