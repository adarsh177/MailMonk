const nodemailer = require("nodemailer");
const config = require('../config.json');

class MailsManager{

    constructor(){

    }

    init(){
        this.mail = nodemailer.createTransport({
            host: config.mailHost,
            pool: true,
            maxConnections: 10,
            maxMessages: 150,
            port: config.mailPort,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config.mailUsername, // generated ethereal user
                pass: config.mailPassword, // generated ethereal password
            },
        });

        console.log('Connected successfully to server: MailsManager');
    }

    sendMail(to, subject, body, bodyHTML, from = 'Developers Monk'){
        // send mail with defined transport object
        this.mail.sendMail({
            from: `"${from}" <admin@developersmonk.com>`,
            to: to,
            subject: subject,
            text: body,
            html: bodyHTML
        }, (err, info) => {
            if(err != null){
                console.log('Error Sending Mail', err);
            }
        });
    }
}

module.exports = MailsManager;