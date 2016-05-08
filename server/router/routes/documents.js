var router = require('express').Router();
var DocumentsController = require('../../controllers/documents');

// e.g. GET localhost:8080/documents
router.get('/', DocumentsController.getAll);

// e.g. POST localhost:8080/documents
router.post('/', DocumentsController.addDocument);

// e.g. GET localhost:8080/documents/13
router.get('/:id', DocumentsController.getDocument);

// e.g. PUT localhost:8080/documents/13
router.put('/:id', DocumentsController.updateDocument);

module.exports = router;
