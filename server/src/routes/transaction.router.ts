import { Router } from "express";
import TransController from "../controllers/transaction.controller";

export default class TransactionRouter {

    private path: string;
    private router: Router;
    private transController: TransController;

    constructor() {
        this.path = "/transactions";
        this.router = Router();
        this.transController = new TransController();
        this.init();
    }

    /**
     * Initialize API routes
     */
    public init() {
        this.router.post(`${this.path}`, this.transController.addTransaction);
        this.router.get(`${this.path}/:pbk`, this.transController.getTransactionsByPublicKey);
        this.router.get(`${this.path}/:pbk/cansee`, this.transController.getTransactionsCanSee);
    }

    /**
     * get express router
     * @returns {Router}
     */
    public get() {
        return this.router;
    }
}
