import { validate } from "class-validator";
import { Request, Response } from "express";
import "reflect-metadata";
import {Container, Inject } from "typedi";
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
        const recordValidation = await validate(record);
        if (recordValidation.length > 0) {
            res.status(500).send(recordValidation);
        } else {
            // generate key
            const userPublicKey = req.body.publicKey;
            // create asset and save transaction for history
            const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });
            const user = await UserModel.findOne({ _publicKey: userPublicKey });
            const bigchainService = Container.get(BigchainDbService);
            try{
                const result = await bigchainService.append(user, userPublicKey, record, transaction);
                res.status(200).send({ success: true, message: "Transactions successfully updated", data: result});
            }
            catch(err){
                res.status(520).send({ success: false, message: err.message});
            }
        }
    }

    public async getTransactionsByPublicKey(req: Request, res: Response) {
        // retrieve data
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });

        if (transaction) {
            const bigchainService = Container.get(BigchainDbService);
            try{
            const result = await bigchainService.retrieveById(transaction.transactionId);
            res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: result});
            }
            catch(err){
                res.status(520).send({ success: false, message: err.message});
            }
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
            try{
                const bigchainService = Container.get(BigchainDbService);
                const result =  await bigchainService.retrieveAll();
                const allowedTransactions: any[] = [];
                // check wether the current pbk exist in blockchain assets
                result.forEach((asset) => {
                    if (asset.data.record._canSee && asset.data.record._canSee.includes(userPublicKey)) {
                        allowedTransactions.push(asset);
                    }
                });
                res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: allowedTransactions });
            }catch(err){
                res.status(520).send({ success: false, message: err.message});
            }
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }

    public async getTransactionsCanWrite(req: Request, res: Response) {
        // retrieve data
        const userPublicKey = req.params.pbk;
        const transaction = await TransactionModel.findOne({ _userPublicKey: userPublicKey });
        // check if transactions exist
        if (transaction) {
            const bigchainService = Container.get(BigchainDbService);
            try{
                const result = await bigchainService.retrieveAll();
                const allowedTransactions: any[] = [];

                // check wether the current pbk exist in blockchain assets
                result.forEach((asset) => {
                    if (asset.data.record._canWrite && asset.data.record._canWrite.includes(userPublicKey)) {
                        allowedTransactions.push(asset);
                    }
                });
            res.status(200).send({ success: true, message: "Transactions successfully retrieved", data: allowedTransactions });
            }catch(err){
                res.status(520).send({ success: false, message: err.message}); 
            }
        } else {
            res.status(404).send({ success: false, message: "No transactions found" });
        }
    }
}
