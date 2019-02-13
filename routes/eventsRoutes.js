const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const middleware = require('../middleware');

//Events page
router.get('/events', (req, res) => {
    Event.find({}, function(err, events){
        if(err){
            console.log(err);
        } else{
            res.render('events', {events:events});
        }
    });
});

router.post('/events', (req, res) => {
    var name = req.body.name;
    var date = req.body.date;
    var dateWords = req.body.dateWords;
    var image = req.body.image;
    var description = req.body.description;
    var newEvent = {name: name, date: date, dateWords: dateWords, image: image, description: description};
    //create a new event and save to dataase
    Event.create(newEvent, function(err, newlycreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('admin');
        }
    });
});

//admin page
router.get('/admin', middleware.isLoggedIn, (req, res) => {
    Event.find({}, function(err, events){
        if(err){
            console.log(err);
        } else{
            res.render('admin',{events:events});
        }
    });
});

module.exports = router;