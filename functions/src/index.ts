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
        if(!req.body.email) res.status(400).send("Email is required");

        const data = req.body;
        const mailData = {
            from: "Mailgun Sandbox <postmaster@sandbox50078a17fbfd4d73b6ed95c8ff2c201d.mailgun.org>",
            to: `${data.email}`,
            cc: "andre.neyra@gmail.com",
            subject: "Contact Info",
            html: `
            <div>
                <h1> Hello! <strong>${data.email}</strong><h1>
                <h2>Thank you for contacting us! </h2>
                <p> We hope PiggyBank makes you happy </p>
                <p> Someone from our team will be in touch with you soon :)..  Thanks for your preference</p>
                <hr>

                <h2> Info Provided </h2>

                FirstName: ${data.firstname || ""} <br>
                LastName: ${data.lastname || ""} <br>
                FirstName: ${data.phone || ""} <br>
                Email: ${data.email} <br>
                TextArea: ${data.textarea || ""} <br>

            </div>
            `
        };

        mg.messages().send(mailData, function (error:any, body:any) {
            try{
                res.status(200).send(data);
            }
            catch{
                res.status(400).send(error);
            }
        });
    });
});

