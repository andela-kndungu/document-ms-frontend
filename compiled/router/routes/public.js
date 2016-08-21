'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _users = require('../../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// Return the home page (GET /)
router.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../../public/index.html'));
});

// Create a user (POST /users)
router.post('/users', _users2.default.create);

// Log in a user (POST /users/login)
router.post('/users/login', _users2.default.login);

exports.default = router;