import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as config from "../config.json";
import BigchainOrm from "./bigchain/bigchain-orm";
import AuthRouter from "./routes/auth.router";

export default class Server {

    private port: any;

    /**
     * Server's constructor
     */
    constructor(port: any) {
        this.port = port;
    }

    /**
     * Starts the server
     */
    public start(): void {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cors());
        mongoose.connect(config.mongo_uri, { useNewUrlParser: true });

        // home route
        app.get("/", (request: Request, response: Response) => {
            response.send("Hello world 🍗");
        });

        // init auth router
        const authRouter = new AuthRouter();
        app.use(authRouter.get());

        // listen
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });

    }

}
