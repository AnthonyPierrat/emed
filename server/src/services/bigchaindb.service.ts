import "reflect-metadata";
import {Service} from "typedi";
import bddOrm from "../bigchain/bigchain-orm";
import { UserType } from "../enums/user-type.enum";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";

@Service()
export default class BigchainDbService {

    public async creation(password: String, record: any, email: String, type: UserType): Promise<any> {
        // generate key
        const userKey = new bddOrm.driver.Ed25519Keypair();
        try {
            const asset = await bddOrm.models.user.create({ keypair: userKey, data: { record } });
            const savedTransaction = await TransactionModel.create({ _userPublicKey: userKey.publicKey, _transactionId: asset.id });
        } catch (err) {
            return 500;
        }

        // save user
        const savedUser = await UserModel.create({ _publicKey: userKey.publicKey, _email: email, _hashPrivateKey: userKey.privateKey, _hashPassword: password, _type: type });
        return savedUser;
    }

    public async retrieveAll(): Promise<any[]> {
        const result = await bddOrm.models.user.retrieve();
        return result;
    }

    public async retrieveById(id: string): Promise<any[]> {
        const result = await bddOrm.models.user.retrieve(id);
        return result;
    }

    public async append(user: User, userPublicKey: string, record: any, transaction: Transaction): Promise<any> {
        let code;
        try {
            const result = this.retrieveById(transaction.transactionId);
            result.then((assets: any) => {
                    if (assets.length) {
                        assets[0].append({ toPublicKey: userPublicKey, keypair: { publicKey: user.publicKey, privateKey: user.hashPrivateKey }, data: { record } });
                        code = 200;
                        return code;
                    } else {
                        code = 404;
                        return code;
                    }
                });
        } catch (err) {
            code = 500;
            return code;
        }
    }

}
