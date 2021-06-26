const express = require('express');
const multer = require('multer');
const Utils = require('./Utils');

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
const API_DMMAIL = require('./Endpoints/DMMail');
const API_LOGIN = require('./Endpoints/Login');
const API_RECEIPTS = require('./Endpoints/Receipts');
const API_TRACK = require('./Endpoints/Track');

// Variables
const mailManager = new MailManager();
const userManager = new UserManager();
let VerifyUserMiddleware = (req, res, next) => {
    userManager.VerifyUser(req, res, next);
}

// Initializing express
const app = express();
mailManager.init();
setupExpressAndMulter();
handleAPICalls();
// Start Listening
app.listen(3500, () => {
    console.log('Express Connected!');
});

function setupExpressAndMulter(){
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
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
    // Direct Mail API
    app.get('/dm/getDraft', VerifyUserMiddleware, (req, res) => {
        
    });

    // Receipts API
    app.get('/receipts', VerifyUserMiddleware, async (req, res) =>  {
        res.send("Done!!");
    });
    app.get('/receipts/:receiptId', VerifyUserMiddleware, (req, res) => {
        
    });

    // Campaign API
    app.get('/campaign', VerifyUserMiddleware, (req, res) => {

    });
    app.get('/campaign/:campaignId', VerifyUserMiddleware, (req, res) => {

    });
    app.delete('/campaign/:campaignId', VerifyUserMiddleware, (req, res) => {

    });
    app.post('/campaign/new', VerifyUserMiddleware, (req, res) => {

    });
    app.get('/campaign/draft', VerifyUserMiddleware, (req, res) => {

    });

    // Contacts API
    app.get('/contacts/:groupId', VerifyUserMiddleware, (req, res) => {

    });
    app.delete('/contacts/:groupId/:contactId', VerifyUserMiddleware, (req, res) => {

    });
    app.put('/contacts/:groupId/:contactId', VerifyUserMiddleware, (req, res) => {

    });
    app.post('/contacts/add', VerifyUserMiddleware, (req, res) => {

    });
}