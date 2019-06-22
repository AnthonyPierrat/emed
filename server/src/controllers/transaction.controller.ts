import { validate } from "class-validator";
import { Request, Response } from "express";
import { userInfo } from "os";
import "reflect-metadata";
import { Container, Inject } from "typedi";
import { EventType } from "../enums/event-type.enum";
import Record from "../models/record.model";
import Transaction, { TransactionModel } from "../models/transaction.model";
import User, { UserModel } from "../models/user.model";
import BigchainDbService from "../services/bigchaindb.service";

export default class TransactionController {

    constructor() {
    }

    public async addTransaction(req: Request, res: Response) {
        // retrieve data
        const record: Record = new Record(req.body.data);
        const userPublicKey = req.body.publicKey;
        const currentUser = await UserModel.findOne({ _publicKey: userPublicKey });
        // validate record
        const recordValidation = await validate(record);

        if (recordValidation.length > 0) {
            res.status(500).send(recordValidation);
        } else {
            if (record.event === EventType.TRANSFER) {
                if (record.canSee.length > 0) {
                    const lastCanSeeKey = record.canSee[record.canSee.length - 1];
                    const userRead = await UserModel.findOne({ _publicKey: lastCanSeeKey });
                    if (!userRead) {
                        res.status(401).send({ success: false, message: "Transfer incorrect", data: null });
                    }
                }
                if (record.canWrite.length > 0) {
                    const lastCanWriteKey = record.canWrite[record.canWrite.length - 1];
                    const userWrite = await UserModel.findOne({ _publicKey: lastCanWriteKey });
                    if (!userWrite || userWrite.type !== 2) {
                        res.status(401).send({ success: false, message: "Transfer incorrect", data: null });
                    }
                }
            }
            const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });
            const bigchainService = Container.get(BigchainDbService);
            const result = await bigchainService.append(currentUser, userPublicKey, record, transaction);
            res.status(200).send({ success: true, message: "Transactions successfully updated", data: result });
        }
    }

    public async getTransactionsByPublicKey(req: Request, res: Response) {
        // retrieve data
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });

        if (transaction) {
            const bigchainService = Container.get(BigchainDbService);
            try {
                const result = await bigchainService.retrieveById(transaction.transactionId);
                res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: result });
            } catch (err) {
                res.status(520).send({ success: false, message: err.message });
            }
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }

    public async getPermissionsByPublicKey(req: Request, res: Response) {
        // retrieve data
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });
        // check if transactions exist
        if (transaction) {
            try {
                const bigchainService = Container.get(BigchainDbService);
                const result = await bigchainService.retrieveById(transaction.transactionId);
                const usersCanSee = await UserModel.find().where({ _publicKey: { $in: result[0].data.record._canSee } });
                const usersCanWrite = await UserModel.find().where({ _publicKey: { $in: result[0].data.record._canWrite } });
                res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: { usersCanSee, usersCanWrite } });
            } catch (err) {
                res.status(520).send({ success: false, message: err.message });
            }
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }

    public async getAccessByPublicKey(req: Request, res: Response) {
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });
        // check if transactions exist
        if (transaction) {
            try {
                const bigchainService = Container.get(BigchainDbService);
                const result = await bigchainService.retrieveAll();
                const allowedTransactionsCanSee: any[] = [];
                const allowedTransactionsCanWrite: any[] = [];
                // check wether the current pbk exist in blockchain assets
                result.forEach((asset) => {
                    if (asset.data.record._canSee && asset.data.record._canSee.includes(userPublicKey)) {
                        allowedTransactionsCanSee.push(asset.id);
                    }
                    if (asset.data.record._canWrite && asset.data.record._canWrite.includes(userPublicKey)) {
                        allowedTransactionsCanWrite.push(asset.id);
                    }
                });
                const usersCanSeeTransaction = await TransactionModel.find().where({ _transactionId: { $in: allowedTransactionsCanSee } });
                const usersCanWriteTransaction = await TransactionModel.find().where({ _transactionId: { $in: allowedTransactionsCanWrite } });
                const canSeeKeys = usersCanSeeTransaction.map((element: any) => element._userPublicKey);
                const canWriteKeys = usersCanWriteTransaction.map((element: any) => element._userPublicKey);
                const usersCanSee = await UserModel.find().where({ _publicKey: { $in: canSeeKeys } });
                const usersCanWrite = await UserModel.find().where({ _publicKey: { $in: canWriteKeys } });
                res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: { usersCanSee, usersCanWrite } });
            } catch (err) {
                res.status(520).send({ success: false, message: err.message });
            }
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }
}
