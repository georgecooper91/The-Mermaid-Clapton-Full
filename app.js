const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Events');
const nodemailer = require('nodemailer');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

app.use(require('express-session')({
    secret: 'Charlie is the best!!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to mongodb
mongoose.connect('mongodb://localhost/mermaid', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected to database');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//index page
app.get('/', function(req, res){
    res.render('index');
});

//send email to chimpmailer
app.post('/', function(req, res){
    addEmailToMailChimp(req.body.email);
    console.log(req.body.email);
    res.send('sent');
});

//add e-mail to mail chimp
function addEmailToMailChimp(email){
    var request = require("request");

    var options = { method: 'POST',
    url: 'https://us20.api.mailchimp.com/3.0/lists/50d6ed4cad/members',
    headers: 
    { 'Postman-Token': '',
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

//location page
app.get('/location', function(req, res){
    res.render('location');
});

//draught list page
app.get('/draughtlist', function(req, res){
    res.render('draughtList');
});

//menu page
app.get('/menu', function(req, res){
    res.render('menu');
});

//Events page
app.get('/events', (req, res) => {
    Event.find({}, function(err, events){
        if(err){
            console.log(err);
        } else{
            res.render('events',{events:events});
        }
    });
});

app.post('/events', (req, res) => {
    var name = req.body.name;
    var date = req.body.date;
    var image = req.body.image;
    var description = req.body.description;
    var newEvent = {name: name, date: date, image: image, description: description};
    //create a new event and save to dataase
    Event.create(newEvent, function(err, newlycreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('admin');
        }
    });
});

//contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res) => {
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
        pass: "" // generated ethereal password
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

//login page
app.get('/login', (req, res) => {
    res.render('login');
});

//handling user sign up
// app.post('/login', function(req, res) {
//     req.body.username
//     req.body.password
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render('login');
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("admin");
//         });
//     });
// });

app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
}), (req, res) => {
});

//log out
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

//admin page
app.get('/admin', isLoggedIn, (req, res) => {
    Event.find({}, function(err, events){
        if(err){
            console.log(err);
        } else{
            res.render('admin',{events:events});
        }
    });
    //res.render('admin');
});

//show page
app.get('/admin/:id', isLoggedIn, (req, res) => {
    //find event from db using ID
    Event.findById(req.params.id, function(err, foundEvent){
        if(err){
            console.log(err);
        } else {
            //render event on show template
            res.render('show', {event: foundEvent});
        }
    });
});

//edit event
app.get('/admin/:id/edit', isLoggedIn, (req, res) => {
    Event.findById(req.params.id, function(err, foundEvent){
        if(err){
            console.log(err);
            res.redirect('admin');
        } else {
            res.render('edit', {event: foundEvent});
        }
    });
});

//update event
app.put('/admin/:id', function(req, res){
    var data = {name: req.body.name, date: req.body.date, image: req.body.image, description: req.body.description}
    Event.findByIdAndUpdate(req.params.id, data, function(err, updatedEvent){
        if(err){
            res.redirect('/admin');
            console.log(err);
        } else {
            res.redirect('/admin/' + req.params.id);
        }
    });
});

//destroy event
app.delete('/admin/:id', (req, res) => {
    Event.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect('/admin/:id');
        } else{
            res.redirect('/admin');
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen('3000', function(){
    console.log("App has started");
});