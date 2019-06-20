import User, { UserModel } from "../models/user.model";

const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
import * as ejs from "ejs";
import {readFileSync} from "fs";

export default class MailService {

    constructor() { }

    public async sendMail(user: User) {

        const transporter = nodeMailer.createTransport(smtpTransport({
            service: "gmail",
            auth: {
                user: "emedsi73@gmail.com",
                pass: "emed1234"
            }
        }));

        const mailOptions = {
            from: '"noreply-emed" <noreply-emed@gmail.com>',
            to: user.email,
            subject: "Bienvenue chez E-med ",
            html : ejs.render(
                readFileSync(`${__dirname}/../template/mail.template.ejs`).toString(),
                    {
                        publicKey: user.publicKey
                    })
        };

        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message %s sent: %s", info.messageId, info.response);
            });
    }
}
