const express = require('express');
const router = express.Router();

//index page
router.get('/', (req, res) => {
    res.render('index');
});

//send email to chimpmailer
router.post('/', (req, res) => {
    addEmailToMailChimp(req.body.email);
    res.send('sent', {msg1: 'You have been added to our mailing list!'});
});

//add e-mail to mail chimp
function addEmailToMailChimp(email){
    var request = require("request");

    var options = { method: 'POST',
    url: 'https://us20.api.mailchimp.com/3.0/lists/50d6ed4cad/members',
    headers: 
    { 'Postman-Token': 'e1e2945d-c102-3f83-d07d-4124f51cbdb3',
        'Cache-Control': 'no-cache',
        Authorization: 'Basic YW55c3RyaW5nOjIwNjQ5MDk3YjQzNjk5MTcxYmMyYzA3OTIzYjhlNGFkLXVzMjA=',
        'Content-Type': 'application/json' },
    body: { email_address: email, status: 'subscribed' },
    json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

module.exports = router;