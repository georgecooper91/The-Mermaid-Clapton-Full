const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

//contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});

router.post('/send', (req, res) => {
    const output = `
    <p>You have a new enquiry</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>E-mail: ${req.body.emailContact}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

     // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.123-reg.co.uk",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "bookings@themermaidclapton.com", // generated ethereal user
        pass: "Qatar690!" // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"The Mermaid" <bookings@themermaidclapton.com>', // sender address
        to: "bookings@themermaidclapton.com", // list of receivers
        subject: "New enquiry", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg: "Message sent successfully"});
    });
});

module.exports = router;