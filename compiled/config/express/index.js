'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('../../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expressConfig = function expressConfig(app) {
  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));

  app.use(_bodyParser2.default.json());
  app.use(_express2.default.static('public'));
  (0, _router2.default)(app);
};

exports.default = expressConfig;