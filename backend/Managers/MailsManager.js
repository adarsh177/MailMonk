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
            port: config.mailPort,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config.mailUsername, // generated ethereal user
                pass: config.mailPassword, // generated ethereal password
            },
        });

        console.log('Connected successfully to server: MailsManager');
    }

    // returns list of accepted addresses
    async sendMail(to, from = 'Developers Monk', cc = [], bcc = [], subject, bodyHTML){
        try{
            // send mail with defined transport object
            let rslt = await this.mail.sendMail({
                            from: `"${from}" <${config.mailUsername}>`,
                            to: to,
                            cc: cc,
                            bcc: bcc,
                            subject: subject,
                            html: bodyHTML
                        });
            return rslt.accepted;
        }catch(ex){
            console.log('Error Sending Mail', ex);
            return null;
        }
    }
}

module.exports = MailsManager;