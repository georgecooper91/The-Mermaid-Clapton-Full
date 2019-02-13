const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//login page
router.get('/login', (req, res) => {
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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
}), (req, res) => {
});

//log out
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.use(require('express-session')({
    secret: 'Charlie is the best!!',
    resave: false,
    saveUninitialized: false
}));

module.exports = router;