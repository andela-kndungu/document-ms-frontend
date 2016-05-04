// Set environment variable in .env file
require('dotenv').config();

// Set up express
var express = require('express');
var app = express();

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
