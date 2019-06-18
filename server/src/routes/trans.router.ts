import { Router } from "express";
import TransController from "../controllers/trans.controller";

export default class TransRouter {

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
        this.router.post(`${this.path}`, this.transController.transaction);
    }

    /**
     * get express router
     * @returns {Router}
     */
    public get() {
        return this.router;
    }
}
