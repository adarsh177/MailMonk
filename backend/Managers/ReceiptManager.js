const { response } = require("express");
const { MongoClient, ObjectID } = require("mongodb");


class ReceiptManager{

    constructor(){
        this.uri = "mongodb+srv://mailmonk-user:jKHLyStfxmt2qDU2@mailmonk-main-cluster.yub3v.mongodb.net/test";
        this.client = new MongoClient(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.init();
    }

    async init(){
        try{
            await this.client.connect();
            await this.client.db("MailMonk").command({ ping: 1 });
            this.db = this.client.db('MailMonk');
            this.ReceiptCollection = this.db.collection('MailReceipt')
            console.log("Connected successfully to server: ReceiptManager");
        }catch(ex){
            console.error('Error connecting to database(ReceiptManager), ', ex);
        }
    }

    async GetReceipts(userId, page){
        let projectionObject = {
            subject: true,
            type: true,
            status: true,
            time: true,
            views: true
        };
        let cursor = this.ReceiptCollection.find({userId: userId}, {skip: (page * 10), limit: 10, projection: projectionObject});
        try{
            let receipts = await cursor.toArray()
            return receipts;
        }catch(ex){
            console.log('Error in GetReceipts', ex);
        }
        return [];
    }

    async GetOneReceipt(userId, receiptId){
        try{
            let receiptInfo = await this.ReceiptCollection.findOne({_id: new ObjectID(receiptId), userId: userId});
            return receiptInfo;
        }catch(ex){
            console.log('Error in GetOneReceipt', ex);
        }
        return null;
    }

    // for scheduled receipts
    async CancelReceipt(userId, receiptId){
        try{
            let receiptInfo = await this.ReceiptCollection.findOne({receiptId: receiptId, userId: userId});
            if(receiptInfo.status == "pending"){
                await this.ReceiptCollection.updateOne({userId: userId, _id: new ObjectID(receiptId)}, {$set: {status: "cancel"}});
                return true;
            }
        }catch(ex){
            console.log('Error in CancelReceipt', ex);
        }
        return false;
    }

    // data will contain complete info as in mongodb
    async CreateReceipt(contactManager, userId, data){
        try{
            let receiptData = {
                ...data,
                to: await contactManager.ResolveReceipientList(userId, data.to),
                cc: await contactManager.ResolveReceipientList(userId, data.cc),
                bcc: await contactManager.ResolveReceipientList(userId, data.bcc),
                userId: userId,
                status: "pending",
                views: 0,
                type: "direct",
                time: parseInt(data.time, 10)
            };
            let result = await this.ReceiptCollection.insertOne(receiptData);
            console.log('Id', result.insertedId);
            return result.insertedId;
        }catch(ex){
            console.log('Error in CreateReceipt', ex);
        }
        return false;
    }
}

module.exports = ReceiptManager;
