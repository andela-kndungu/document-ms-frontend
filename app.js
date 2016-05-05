// Set environment variable in .env file
require('dotenv').config();

// Set up express
var express = require('express');
var app = express();

// Set up the database
var mongoose = require('mongoose');
var dataseUri = process.env.DATABASE_URI;
var db = mongoose.connect(dataseUri);

// Provide feedback
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
db.once('open', function() {
    console.log('Successfully connected to db');
});

// Port set to value in .env file or 3000 default
app.set('port', process.env.PORT || 3000);

// Set up bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Handle all routes
var router = require('./server/router')(app);

// Start receiving request
app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

// To be able to use with supertest
module.exports = app;
