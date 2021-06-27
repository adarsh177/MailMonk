const { MongoClient, ObjectID } = require("mongodb");
const Config = require('../config.json');

class CampaignsManager{
    constructor(){
        this.uri = Config.mongoUri;
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
            this.CampaignCollection = this.db.collection("Campaigns");
            console.log("Connected successfully to server: CampaignsManager");
        }catch(ex){
            console.error('Error connecting to database(CampaignsManager), ', ex);
        }
    }

    async AddCampaign(contactManager, userId, data){
        try{
            let campaignInfo = {
                ...data,
                userId: userId,
                nextTime: parseInt(data.startTime, 10),
                startTime: parseInt(data.startTime, 10),
                endTime: parseInt(data.endTime, 10),
                interval: parseInt(data.interval, 10),
                to: await contactManager.ResolveReceipientList(userId, data.to),
                cc: await contactManager.ResolveReceipientList(userId, data.cc),
                bcc: await contactManager.ResolveReceipientList(userId, data.bcc),
                status: "running"
            };
            let campaignResult = await this.CampaignCollection.insertOne(campaignInfo);
            return campaignResult.insertedId;
        }catch(ex){
            console.error('Error creating campaign in AddCampaign', ex);
            return null;
        }
    }

    async GetCampaigns(userId, page){
        let projectionObject = {
            status: true,
            startTime: true,
            endTime: true,
            name: true,
            interval: true,
            nextTime: true
        };
        let cursor = this.CampaignCollection.find({userId: userId}, {skip: (page * 10), limit: 10, projection: projectionObject});
        try{
            let campaigns = await cursor.toArray()
            return campaigns;
        }catch(ex){
            console.log('Error in GetCampaigns', ex);
        }
        return [];
    }

    async GetCampaignDetails(userId, campaignId){
        let receiptProjectionObject = {
            subject: true,
            type: true,
            status: true,
            time: true,
            views: true
        };
        try{
            let campaignInfo = await this.CampaignCollection.findOne({_id: new ObjectID(campaignId), userId: userId});
            let receiptsCursor = this.db.collection("MailReceipt").find({userId: userId, campaignId: campaignId}, {projection: receiptProjectionObject});
            let receipts = await receiptsCursor.toArray();
            if(receipts)
                campaignInfo['receipts'] = receipts;

            return campaignInfo;
        }catch(ex){
            console.log('Error in GetOneReceipt', ex);
        }
        return null;
    }

    async CancelCampaign(userId, campaignId){
        try{
            await this.CampaignCollection.updateOne({userId: userId, _id: new ObjectID(campaignId)}, {$set: {status: "cancelled"}});
            return true;
        }catch(ex){
            console.log('Error in CancelCampaign', ex);
        }
        return false;
    }
}

module.exports = CampaignsManager;
