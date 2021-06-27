const { MongoClient, ObjectID } = require("mongodb");
const Config = require('../config.json');

class TrackManager{
 
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
            this.ReceiptCollection = this.db.collection("MailReceipt");
            console.log("Connected successfully to server: TrackManager");
        }catch(ex){
            console.error('Error connecting to database(TrackManager), ', ex);
        }
    }

    async AddTrack(receiptId){
        await this.ReceiptCollection.updateOne({_id: new ObjectID(receiptId)}, {$inc: {views: 1}});
    }
}

module.exports = TrackManager;
