const { MongoClient, ObjectID } = require("mongodb");
const MailManager = require('../Managers/MailsManager');
const Config = require('../config.json');

const REPEAT_TIME = 1000; // 2 SECONDS
const MAX_RECEIPTS_PER_CYCLE = 20;

class Helper{

    constructor(){
        this.uri = Config.mongoUri;
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
        try{
            await this.checkCampaigns(time);
            let cursor = this.db.collection('MailReceipt').find({$and: [{status: "pending"}, {time: {$lt: time}}]}, {limit: MAX_RECEIPTS_PER_CYCLE});
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

    GetTrackerImage(id){
        return `<br /><a href="https://mailmonk.developersmonk.com"><img src="https://backendmailmonk.developersmonk.com/track/${id}.png" alt="Mail Sent using MailMonk" /></a><br /><p style="font-size: 6px">Timestamp: ${new Date().getTime()}</p>`;
    }

    async checkCampaigns(currTime){
        let cursor = this.db.collection('Campaigns').find({$and: [{status: "running"}, {nextTime: {$lt: currTime}}]}, {limit: 20});
        try{
            let campaigns = await cursor.toArray();
            await Promise.all(
                campaigns.map(async (doc) => {
                    if(await this.CreateReceipt(doc)){
                        let newNextTime = doc.nextTime + doc.interval;
                        let updates = {
                            nextTime: newNextTime,
                            status: newNextTime > doc.endTime ? "completed" : "running",
                        };
                        await this.db.collection('Campaigns').updateOne({_id: new ObjectID(doc._id)}, {$set: updates});
                        console.log('Added receipt from campaign');
                    }else{
                        console.log('Error adding receipt for campaign: ', doc)
                    }
                })
            );
        }catch(ex){
            console.log('Error in checkCampaigns', ex);
        }
    }

    async sendMails(receipts = []){
        await Promise.all(
            receipts.map(async (receipt) => {
                try{
                    if(receipt.to.length === 0 && receipt.cc.length === 0 && receipt.bcc.length === 0){
                        return;
                    }
                    
                    let body = receipt.body + this.GetTrackerImage(receipt._id);
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

    // data will contain complete info as in mongodb
    async CreateReceipt(data){
        try{
            let receiptData = {
                ...data,
                status: "pending",
                views: 0,
                type: "campaign",
                campaignId: data._id,
                time: parseInt(data.nextTime, 10)
            };
            delete(receiptData._id);
            delete(receiptData.startTime);
            delete(receiptData.endTime);
            delete(receiptData.interval);
            delete(receiptData.name);
            
            let result = await this.db.collection('MailReceipt').insertOne(receiptData);
            console.log('Id', result.insertedId);
            return result.insertedId;
        }catch(ex){
            console.log('Error in CreateReceipt', ex);
        }
        return false;
    }
}

module.exports = Helper;