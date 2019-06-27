import "reflect-metadata";
import { Service } from "typedi";
import bddOrm from "../bigchain/bigchain-orm";
import { UserType } from "../enums/user-type.enum";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";

@Service()
export default class BigchainDbService {

    /**
     * Create a new asset in bigchainDB
     * @param {string} password
     * @param {any} record
     * @param {string} email
     * @param {UserType} type
     * @returns {Promise}
     */
    public async creation(password: string, record: any, email: string, type: UserType): Promise<any> {
        // generate key
        const userKey = new bddOrm.driver.Ed25519Keypair();
        try {
            const asset = await bddOrm.models.user.create({ keypair: userKey, data: { record } });
            const savedTransaction = await TransactionModel.create({ _userPublicKey: userKey.publicKey, _transactionId: asset.id });
        } catch (err) {
            throw TypeError("Something wrong happen");
        }

        // save user
        const savedUser = await UserModel.create({ _publicKey: userKey.publicKey, _email: email, _hashPrivateKey: userKey.privateKey, _hashPassword: password, _type: type });
        return savedUser;
    }

    /**
     * Retrieve all assets in the blockchain
     * @returns {Promise}
     */
    public async retrieveAll(): Promise<any[]> {
        try {
            const result = await bddOrm.models.user.retrieve();
            return result;
        } catch (err) {
            throw TypeError("Something went wrong");
        }
    }

    /**
     * Retrieve transactions assets using public key
     * @param {string} id public key
     */
    public async retrieveById(id: string): Promise<any> {
        try {
            const result = await bddOrm.models.user.retrieve(id);
            return result;
        } catch (err) {
            throw TypeError("Something went wrong");
        }
    }

    /**
     * Update an asset, will create a new transaction on a existing asset
     * @param {User} user
     * @param {string} userPublicKey
     * @param {any} record
     * @param {Transaction} transaction
     */
    public async append(user: User, userPublicKey: string, record: any, transaction: Transaction): Promise<any> {
        try {
            const result = await this.retrieveById(transaction.transactionId);
            if (result.length > 0) {
                return result[0].append({ toPublicKey: userPublicKey, keypair: { publicKey: user.publicKey, privateKey: user.hashPrivateKey }, data: { record } });
            } else {
                throw TypeError("No assets to update");
            }
        } catch (err) {
            throw TypeError("Something went wrong" + err.message);
        }
    }

}
