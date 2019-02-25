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

//Import routes
const indexRoutes = require('./routes/index');
const pagesRoutes = require('./routes/pagesRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const loginRoutes = require('./routes/loginRoutes');
const editEventRoutes = require('./routes/editEventRoutes');

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

//set-up passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to mongodb
// mongoose.connect('mongodb://localhost/mermaid', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://georginho:georginho@cluster0-gadeg.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected to database');
});

// set-up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use(indexRoutes);
app.use(pagesRoutes);
app.use(eventsRoutes);
app.use(contactRoutes);
app.use(loginRoutes);
app.use('/admin/:id', editEventRoutes);

app.listen('3000', () => {
    console.log("App has started");
});