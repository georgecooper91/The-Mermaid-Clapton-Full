const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    name: String,
    date: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Event', eventsSchema);