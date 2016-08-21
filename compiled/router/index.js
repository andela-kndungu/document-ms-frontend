'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _public = require('./routes/public');

var _public2 = _interopRequireDefault(_public);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _roles = require('./routes/roles');

var _roles2 = _interopRequireDefault(_roles);

var _tags = require('./routes/tags');

var _tags2 = _interopRequireDefault(_tags);

var _documents = require('./routes/documents');

var _documents2 = _interopRequireDefault(_documents);

var _authenticate = require('../controllers/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// All the various routes
var router = function router(app) {
  // Accessible without being logged in
  app.use('/', _public2.default);

  // Protect sensitive routes
  app.use(_authenticate2.default.token);
  app.use('/users', _users2.default);
  app.use('/roles', _roles2.default);
  app.use('/tags', _tags2.default);
  app.use('/documents', _documents2.default);
};

// Authentication Middleware
exports.default = router;