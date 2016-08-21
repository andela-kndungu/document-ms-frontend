'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up environment variables when not running on CIo
if (!process.env.DATABASE_URI) {
  require('dotenv').config();
}

var databaseUri = process.env.DATABASE_URI;
var dbConnect = function dbConnect() {
  // Connect to the database and get the connection
  _mongoose2.default.connect(databaseUri);
  var dbConnection = _mongoose2.default.connection;

  // Provide feedback on the DB connection
  dbConnection.on('error', function (error) {
    console.error(error);
  });

  dbConnection.once('open', function () {
    console.info('Successfully connected to db');
  });
};

exports.default = dbConnect;