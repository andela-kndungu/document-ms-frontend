'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _documents = require('../../controllers/documents.js');

var _documents2 = _interopRequireDefault(_documents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// Create a document (POST /documents)
router.post('/', _documents2.default.create);

// Fetch document by ID (GET /documents/id)
router.get('/:id', _documents2.default.find.id);

// Fetch all documents (GET /documents)
router.get('/', _documents2.default.find.all);

// Update document by ID (PUT /documents/id)
router.put('/:id', _documents2.default.update);

// Delete document by id (DELETE /documents/id)
router.delete('/:id', _documents2.default.destroy);

exports.default = router;