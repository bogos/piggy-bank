import * as functions from 'firebase-functions';
import * as admin  from 'firebase-admin';
const mailgun = require("mailgun-js");

// Cors
const cors = require('cors')({origin: true});

admin.initializeApp()
require('dotenv').config();

const { MAILGUN_DOMAIN, MAILGUN_API_KEY } = process.env;

// Mailgun configuration
const DOMAIN = MAILGUN_DOMAIN;
const mg = mailgun({apiKey: MAILGUN_API_KEY, domain: DOMAIN});


exports.sendEmailNotification = functions.https.onRequest((req, res) => {

    cors(req, res, ()=> {
        
        // TODO: Add validations
        const data = req.body;
        const mailData = {
            from: "Mailgun Sandbox <postmaster@sandbox50078a17fbfd4d73b6ed95c8ff2c201d.mailgun.org>",
            to: `${data.email}`,
            subject: "Contact Info",
            html: `
            <div>
                <img src='"https://image.flaticon.com/icons/svg/2527/2527515.svg"'alt="Italian Trulli"><br>
                <h1> Hello! <strong>${data.email}</strong> Thank you for contacting us! </h1><br>
                <p> We hope PiggyBank makes you happy </p>
                <p> Someone from our team will be in touch with you soon :)..  Thanks for your preference</p>
            </div>
            `
        };

        mg.messages().send(mailData, function (error:any, body:any) {
            try{
                console.log(body);
            }
            catch{
                console.log(error);
            }
        });

        res.status(200).send(data);
    });
});

