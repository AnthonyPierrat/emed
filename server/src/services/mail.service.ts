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
            from: '"noreply-emed" <noreply-emed@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Bienvenue chez E-med ",
            html : ejs.render(
                readFileSync(`${__dirname}/../template/mail.template.ejs`).toString(),
                    {
                        publicKey: user.publicKey
                    })

            /*`<!doctype html>
                        <html lang="en">
                            <head>
                            <header>
                                <h3>Vous venez de rejoindre E-med</h3>
                            </header>
                            <body>
                                Bonjour ` + user.publicKey + `,<br>
                                Vous venez de rejoindre la solution décentralisée E-med.<br>
                                Vous pouvez désormais partarger de manière sécurisée vos informations médicales aux personnes de votre choix en partageant votre identifiant unique.<br>
                                Votre clef de sécurité est la suivante : <b>` + user.publicKey + `<b><br>
                                Nous vous remercions pour votre confiance<br>
                                <br>
                                <i>L'équipe E-med<i>
                            </body>
                            <userKey></userKey>
                        </html>`*/
        };

        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message %s sent: %s", info.messageId, info.response);
            });
    }
}
