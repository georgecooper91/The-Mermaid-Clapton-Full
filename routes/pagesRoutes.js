const express = require('express');
const router = express.Router();

//location page
router.get('/location', (req, res) => {
    res.render('location');
});

//draught list page.
router.get('/draughtlist', (req, res) => {
    res.render('draughtList');
});

//menu page
router.get('/menu', (req, res) => {
    res.render('menu');
});

module.exports = router;