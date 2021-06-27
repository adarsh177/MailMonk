const { MongoClient, ObjectID } = require("mongodb");


class TrackManager{
    AllGood = true;
 
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
            this.ReceiptCollection = this.db.collection("MailReceipt");
            console.log("Connected successfully to server: TrackManager");
        }catch(ex){
            console.error('Error connecting to database(TrackManager), ', ex);
            AllGood = false;
        }
    }

    async AddTrack(receiptId){
        await this.ReceiptCollection.updateOne({_id: new ObjectID(receiptId)}, {$inc: {views: 1}});
    }
}

module.exports = TrackManager;
