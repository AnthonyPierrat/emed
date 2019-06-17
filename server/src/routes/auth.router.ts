import { Router } from "express";
import AuthController from "../controllers/auth.controller";

export default class AuthRouter {

    private path: string;
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.path = "/auth";
        this.router = Router();
        this.authController = new AuthController();
        this.init();
    }

    /**
     * Initialize API routes
     */
    public init() {
        this.router.post(`${this.path}/signup`, this.authController.signup);
        this.router.post(`${this.path}/signin`, this.authController.signin);
    }

    /**
     * get express router
     * @returns {Router}
     */
    public get() {
        return this.router;
    }
}
