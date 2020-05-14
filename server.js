#!/usr/bin/env node

const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

/** SERVER SETUP */
const server = app.listen(7002, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

const to = 'contact@premiercctvinstalls.co.uk';

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '')));

// CONTACT FORM HANDLING
app.post('/send', (req, res) => {
    let data = req.body;
    let mailOptions = {
        from: `${data.name} ${data.email}`,
        to: to,
        subject: "New Message From Website Contact Form",
        text: `Name: ${data.name}\nNumber: ${data.number == "" ? 'n/a' : data.number}\nEmail: ${data.email == "" ? 'n/a' : data.email}\n\n${data.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message to ${to} from ${data.name} ${info.messageId}`);
        res.sendStatus(200);
    });
})

/** EMAIL SETUP */
const transporter = nodemailer.createTransport({
    host: "mail.lcn.com",
    port: 465,
    secure: true,
    auth:
    {
        type: "login",
        user: "matt.bailey@premiercctvinstalls.co.uk",
        pass: "PremProNewSite20"
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function (error, success) 
{
    if (error) {
      console.log(error);
    } else {
      console.log("Mail Server running");
    }
});