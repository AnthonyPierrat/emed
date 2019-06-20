import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { Container } from "typedi";
import { UserType } from "../enums/user-type.enum";
import User, { UserModel } from "../models/user.model";
import BigchainDbService from "../services/bigchaindb.service";

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
            // hash user password
            password = await hash(password, 10);
            // call creation service
            const bigchainService = Container.get(BigchainDbService);
            const code = await bigchainService.creation(password, record, email, type);
            if (code === 500) {
                res.status(500).send("Something wrong happen");
            } else {
                res.status(201).send({ success: true, message: "User successfully created", data: code });
            }
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
        }
    }

}
