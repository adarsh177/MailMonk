// Importing Libraries
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Utils = require('./Utils');
const cors = require('cors')

// Importing Managers
const UserManager = require('./Managers/UserManager');
const CampaignsManager = require('./Managers/CampaignsManager');
const ContactsManager = require('./Managers/ContactsManager');
const ReceiptManager = require('./Managers/ReceiptManager');
const TrackManager = require('./Managers/TrackManager');
const MailManager = require('./Managers/MailsManager');

// Importing API Endpoints
const API_CAMPAIGNS = require('./Endpoints/Campaigns');
const API_CONTACTS = require('./Endpoints/Contacts');
const API_RECEIPTS = require('./Endpoints/Receipts');
const API_TRACK = require('./Endpoints/Track');

// Variables
const mailManager = new MailManager();
const userManager = new UserManager();
const contactManager = new ContactsManager();
const receiptManager = new ReceiptManager();
const trackManager = new TrackManager();
const campaignManager = new CampaignsManager();
let VerifyUserMiddleware = (req, res, next) => {
    userManager.VerifyUser(req, res, next);
}

// Initializing express
const app = express();
mailManager.init();
const logoData = fs.readFileSync('./Resources/MailMonk.png');   // loading mail logo
setupExpressAndMulter();
handleAPICalls();

// Start Listening
app.listen(3500, () => {
    console.log('Express Connected!');
});

function setupExpressAndMulter(){
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    // app.use(cors({credentials: true, methods: ["GET","PUT","POST","DELETE","OPTIONS"], origin: "*", allowedHeaders: ["Authorization"]}));
    app.use(multer({
        storage: multer.diskStorage({
            destination: "./Uploads",
            filename: (req, file, cb) => {
                var ext = file.mimetype.split('/')[1];
                var name = Utils.GenerateRandomString(16);
                while(fs.existsSync(`./Uploads/${name}.${ext}`)){
                    name = Utils.GenerateRandomString(16);
                }

                cb(null, `${name}.${ext}`);
            }
        })
    }).any());
}

function handleAPICalls(){
    app.options("/*", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "firebaseauth");
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.get("/*", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "firebaseauth");
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.post("/*", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "firebaseauth");
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.delete("/*", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "firebaseauth");
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.put("/*", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "firebaseauth");
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    
    // Receipts API
    app.get('/receipts/:page?', VerifyUserMiddleware, (req, res) =>  {
        // Only returns
        API_RECEIPTS.GetReceipts(receiptManager, req, res);
    });
    app.get('/receipts/single/:receiptId', VerifyUserMiddleware, (req, res) => {
        API_RECEIPTS.GetOneReceipt(receiptManager, req, res);
    });
    app.put('/receipts/cancel/:receiptId', VerifyUserMiddleware, (req, res) => {
        API_RECEIPTS.CancelReceipt(receiptManager, req, res);
    });
    
    app.post('/receipts/new', VerifyUserMiddleware, (req, res) => {
        // to, from, 
        API_RECEIPTS.CreateReceipt(receiptManager, contactManager, req, res);
    });

    // Campaign API
    app.get('/campaigns/:page?', VerifyUserMiddleware, async (req, res) => {
        API_CAMPAIGNS.GetAllCampaigns(campaignManager, req, res);
    });
    app.get('/campaigns/single/:campaignId', VerifyUserMiddleware, (req, res) => {
        API_CAMPAIGNS.GetCampaignDetails(campaignManager, req, res);
    });
    app.put('/campaigns/cancel/:campaignId', VerifyUserMiddleware, (req, res) => {
        API_CAMPAIGNS.CancelCampaign(campaignManager, req, res);
    });
    app.post('/campaigns/new', VerifyUserMiddleware, (req, res) => {
       API_CAMPAIGNS.NewCampaign(campaignManager, contactManager, req, res);
    });


    // Contacts API
    app.get('/contacts/groups', VerifyUserMiddleware, (req, res) => {
        API_CONTACTS.GetGroups(contactManager, req, res);
    });
    app.get('/contacts/group/:groupId/', VerifyUserMiddleware, (req, res) => {
        //GetContacts
        API_CONTACTS.GetContacts(contactManager, req, res);
    });
    app.delete('/contacts/:groupId/', VerifyUserMiddleware, (req, res) => {
        //DeleteGroup
        API_CONTACTS.RemoveGroup(contactManager, req, res);
    });
    app.post('/contacts/addGroup', VerifyUserMiddleware, (req, res) => {
        //AddGroup
        API_CONTACTS.AddGroup(contactManager, req, res);
    });
    app.post('/contacts/:groupId', VerifyUserMiddleware, (req, res) => {
        //AddContacts
        API_CONTACTS.AddContact(contactManager, req, res);
    });

    //Tracking Related
    app.get('/track/:trackId', (req, res) => {
        API_TRACK.TrackIt(trackManager, req, res, logoData);
    });
}