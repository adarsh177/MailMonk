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

// Initializing express
const app = express();
mailManager.init();
setupExpressAndMulter();
handleAPICalls();

mailManager.sendMail('adarsh1772000@gmail.com', 'hello', 'test mail');
console.log('done');

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
    // API CALLS HERE

    // Start Listening
    app.listen(3000, () => {
        console.log('Express Connected!');
    });
}