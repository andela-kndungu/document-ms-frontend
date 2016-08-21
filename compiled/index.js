'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Connect to the database
_config2.default.db();

// Add middleware to express
_config2.default.express(app);

// Start taking requests
var webServer = app.listen(process.env.PORT, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info('Server listening at port', process.env.PORT);
  }
});

// To be able to use with supertest
exports.default = webServer;