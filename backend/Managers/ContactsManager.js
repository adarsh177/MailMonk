const { MongoClient } = require("mongodb");

class ContactsManager{
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
            this.ContactCollection = this.db.collection("Contacts");
            console.log("Connected successfully to server: ContactsManager");
        }catch(ex){
            console.error('Error connecting to database(ContactsManager), ', ex);
            AllGood = false;
        }
    }

    async GetContact(userId, groupId){
        let projection = {};
        projection[groupId] = true;
        let query = await this.ContactCollection.findOne({userId: userId}, {projection: projection});
        return query[groupId];
    }

    // passing in array contacts // [{email, name}]
    async AddContacts(userId, contacts = [], groupId){
        if(contacts.length == 0) return;

        let updateQuery = {$addToSet: {}};
        updateQuery['$addToSet'][groupId] = {$each: contacts};
        console.log('AddContact: ', await this.ContactCollection.updateOne({userId: userId}, updateQuery, {upsert: true}));
    }

    async RemoveContact(userId, emailToRemove, groupId){
        let updateQuery = {};
        updateQuery['$pull'][groupId]['email'] = emailToRemove;
        console.log('RemoveContact: ', await this.ContactCollection.updateOne({userId: userId}, updateQuery));
    }

    async AddGroup(userId, groupName){
        // check if contacts collection exists else create
        let exists = await this.ContactCollection.findOne({userId: userId});
        if(!exists){
            await this.ContactCollection.insertOne({userId: userId, groups: [{
                name: groupName,
                id: new Date().getTime().toString()
            }], });
        }else{
            await this.ContactCollection.updateOne({userId: userId}, {$push: {groups: {
                name: groupName,
                id: new Date().getTime()
            }}});
        }
    }

    async RemoveGroup(userId, groupId){
        await this.ContactCollection.updateOne({userId, userId}, {$pull: {groups: {id: groupId}}});
        let query = {};
        query[groupId] = true;
        await this.ContactCollection.updateOne({userId, userId}, {$unset: query});
    }

    

    // pass array as ["mail:adarsh1772000@gmail.com", "group:developers", "mail:119ec0010@iiitk.ac.in"]
    // returns a flat array of emails like : ["email1@gmail.com", "email2@gmail.com", ...]
    async ResolveReceipientList(userId, list = []){
        let finalList = [];

        if(!list) return finalList;

        try{
            await Promise.all(
                list.map(async element =>  {
                    if(element.startsWith("mail:")){
                        if(!finalList.includes(element.replace('mail:', ''))){
                            finalList.push(element.replace('mail:', ''));
                        }
                    }else if(element.startsWith("group:")){
                        let groupId = element.replace('group:', '');
                        let projectionObject = {};
                        projectionObject[groupId] = true;
                        let groupMails = await this.ContactCollection.findOne({userId: userId}, {projection: projectionObject});
                        if(groupMails[groupId]){
                            groupMails[groupId].forEach(element => {
                                if(!finalList.includes(element.email)){
                                    finalList.push(element.email);
                                }
                            });
                        }
                    }
                })
            );
        }catch(ex){
            console.error('Error in ResolveReceipientList', ex);
        }
        
        return finalList;
    }
}

module.exports = ContactsManager;
