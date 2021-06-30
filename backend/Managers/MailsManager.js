const nodemailer = require("nodemailer");
const config = require('../config.json');

class MailsManager{
    constructor(){
        this.CurrentServerIndex = 0;    
    }

    init(){
        if(this.mail != undefined){
            this.mail.close();
        }

        this.mail = nodemailer.createTransport({
            host: config.mailServers[this.CurrentServerIndex].mailHost,
            pool: true,
            maxConnections: 10,
            port: config.mailServers[this.CurrentServerIndex].mailPort,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config.mailServers[this.CurrentServerIndex].mailUsername,
                pass: config.mailServers[this.CurrentServerIndex].mailPassword,
            },
        });

        console.log('Connected successfully to server: MailsManager; Email: ', config.mailServers[this.CurrentServerIndex].mailUsername);
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

            // Switching Email
            this.CurrentServerIndex++
            if(this.CurrentServerIndex >= config.mailServers.length){
                this.CurrentServerIndex = 0;
            }
            this.init();
            return null;
        }
    }
}

module.exports = MailsManager;