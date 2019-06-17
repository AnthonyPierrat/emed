import { Request, Response } from "express";
import bddOrm from "../bigchain/bigchain-orm";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";

export default class AuthController {

    constructor() { }

    public async signup(req: Request, res: Response) {
        // retrieve email
        const email: string = req.body.email;
        // check email already exist
        const user: User = await UserModel.findOne({ email });
        if (user) {
            res.status(409).send("Email already exist");
        } else {
            // retrieve data
            const record: any = req.body.data;
            // generate key
            const userKey = new bddOrm.driver.Ed25519Keypair();
            // create asset
            bddOrm.models.user
                .create({
                    keypair: userKey,
                    data: { record }
                })
                .then(async (asset: any) => {
                    // const savedGenesis = await TransactionModel
                    //    .create({ key: userKey.publicKey, transactionId: asset.id });
                    console.log(asset);
                });
            // save user
            const savedUser = await UserModel.create({ token: userKey.publicKey, email });
            res.status(201).send(savedUser);
        }
    }

}
