const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
var fs = require('fs');

export default class MailService {

    constructor() { }

    public async sendMail(email: string, publicKey: any) {

        const transporter = nodeMailer.createTransport(smtpTransport({
            service: "gmail",
            auth: {
                user: "emedsi73@gmail.com",
                pass: "emed1234"
            }
        }));

        //  var text = ejs.render('Hello, <%= firstName %> <%= lastName %>!', user);
        var template = fs.readFileSync('mail.html',{encoding:'utf-8'});

        const mailOptions = {
            from: '"Emed" <xx@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Bienvenue chez E-med", 
            html : template
        };

        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message %s sent: %s", info.messageId, info.response);
            });
    }
}
