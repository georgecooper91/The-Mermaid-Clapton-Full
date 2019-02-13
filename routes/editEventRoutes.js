const express = require('express');
const router = express.Router({mergeParams: true});
const Event = require('../models/Events');
const middleware = require('../middleware');

//show event page
router.get('/', middleware.isLoggedIn, (req, res) => {
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
router.get('/edit', middleware.isLoggedIn, (req, res) => {
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
router.put('/', (req, res) => {
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
router.delete('/', (req, res) => {
    Event.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect('/admin/:id');
        } else{
            res.redirect('/admin');
        }
    })
});

module.exports = router;