import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import bddOrm from "../bigchain/bigchain-orm";
import { UserType } from "../enums/user-type.enum";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";
import MailService from "../services/mail.service";

export default class AuthController {

    constructor() { }

    public async signup(req: Request, res: Response) {
        // retrieve email
        const email: string = req.body.email;
        const type: UserType = req.body.type;
        let password: string = req.body.password;
        // check email already exist
        const user: User = await UserModel.findOne({ _email: email });
        if (user) {
            res.status(409).send({ success: false, message: "Email already exist" });
        } else {
            // retrieve data
            const record: any = req.body.data;
            // generate key
            const userKey = new bddOrm.driver.Ed25519Keypair();
            // create asset and save transaction for history
            try {
                const asset = await bddOrm.models.user.create({ keypair: userKey, data: { record } });
                const savedTransaction = await TransactionModel.create({ _userPublicKey: userKey.publicKey, _transactionId: asset.id });
            } catch (err) {
                res.status(500).send("Something wrong happen");
            }

            // hash user password
            password = await hash(password, 10);
            // save user
<<<<<<< Updated upstream
            const savedUser = await UserModel.create({ _publicKey: userKey.publicKey, _email: email, _hashPrivateKey: userKey.privateKey, _hashPassword: password, _type: type });
            res.status(201).send({ success: true, message: "User successfully created", data: savedUser });
        }
    }

    public async signin(req: Request, res: Response) {
        const email: string = req.body.email;
        const password: string = req.body.password;
        const checkUser = await UserModel.findOne({ _email: email });

        if (!checkUser) {
            res.status(409).send({ success: false, message: "No user found with this email" });
        } else {
            const isMatching = await compare(password, checkUser.hashPassword);
            if (!isMatching) {
                res.status(401).send({ success: false, message: "Incorrect password" });
            } else {
                res.status(200).send({ success: true, message: "Successfully logged in", data: checkUser });
            }
=======
            const savedUser = await UserModel.create({ token: userKey.publicKey, email });

            const mailService = new MailService();
            await mailService.sendMail(email, userKey.publicKey);
            res.status(201).send(savedUser);
>>>>>>> Stashed changes
        }
    }

}
