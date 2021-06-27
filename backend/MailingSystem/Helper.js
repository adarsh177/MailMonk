const { MongoClient } = require("mongodb");
const MailManager = require('../Managers/MailsManager');

const REPEAT_TIME = 2000; // 2 SECONDS
const MAX_RECEIPTS_PER_CYCLE = 20;

class Helper{

    constructor(){
        this.uri = "mongodb+srv://mailmonk-user:jKHLyStfxmt2qDU2@mailmonk-main-cluster.yub3v.mongodb.net/test";
        this.client = new MongoClient(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.mailManager = new MailManager();
        this.mailManager.init();
        
        this.init();
    }

    async init(){
        try{
            await this.client.connect();
            await this.client.db("MailMonk").command({ ping: 1 });
            this.db = this.client.db('MailMonk');
            console.log("Connected successfully to server: MailManager Helper");
        }catch(ex){
            console.error('Error connecting to database(MailManager Helper), ', ex);
            AllGood = false;
        }
    }

    startCycle(){
        setTimeout(() => this.runLogic(), REPEAT_TIME);
    }

    async runLogic(){
        let time = new Date().getTime();
        let cursor = this.db.collection('MailReceipt').find({$and: [{status: "pending"}, {time: {$lt: time}}]}, {limit: MAX_RECEIPTS_PER_CYCLE});
        try{
            let receipts = await cursor.toArray();
            if(!receipts) receipts = [];
            console.log('Receipts Count: ', receipts.length);
            await this.sendMails(receipts);
        }catch(ex){
            console.log('Error inside runLogic', ex);
        }

        // printing execution time
        let currTime = new Date().getTime();
        console.log('Execution time of cycle: ', currTime - time);

        // Moving to next cycle
        this.startCycle();
    }

    async GetTrackerImage(){
        return `<br><img src="https://backendmailmonk.developersmonk.com/images/dot.png" alt="Mail Sent using MailMonk" /><br><p>Mail sent using MailMonk. Timestamp: ${new Date().getTime()}</p>`;
    }

    async sendMails(receipts = []){
        await Promise.all(
            receipts.map(async (receipt) => {
                try{
                    let body = receipt.body + this.GetTrackerImage();
                    let accepted = await this.mailManager.sendMail(receipt.to, receipt.from,  receipt.cc, receipt.bcc, receipt.subject, body);
                    if(accepted){
                        // sent, now updating receipt
                        await this.db.collection('MailReceipt').updateOne({_id: receipt._id}, {$set: {status: "completed", successList: accepted}});
                    }
                }catch(ex){
                    console.log('Error in sendMails', ex);
                }
            })
        );
    }
}

module.exports = Helper;