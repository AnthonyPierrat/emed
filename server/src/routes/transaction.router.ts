import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";

export default class TransactionRouter {

    private path: string;
    private router: Router;
    private transController: TransactionController;

    constructor() {
        this.path = "/transactions";
        this.router = Router();
        this.transController = new TransactionController();
        this.init();
    }

    /**
     * Initialize API routes
     */
    public init() {
        this.router.post(`${this.path}`, this.transController.addTransaction);
        this.router.get(`${this.path}/:pbk`, this.transController.getTransactionsByPublicKey);
        this.router.get(`${this.path}/:pbk/permissions`, this.transController.getPermissionsByPublicKey);
        this.router.get(`${this.path}/:pbk/accesses`, this.transController.getAccessByPublicKey);
    }

    /**
     * get express router
     * @returns {Router}
     */
    public get() {
        return this.router;
    }
}
