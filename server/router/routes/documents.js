var router = require('express').Router();
var DocumentsController = require('../../controllers/documents');

// e.g. GET localhost:8080/roles
router.get('/', DocumentsController.getAll);

// e.g. POST localhost:8080/roles
router.post('/', DocumentsController.addDocument);

// e.g. PUT localhost:8080/users/13
router.put('/:id', DocumentsController.updateDocument);

module.exports = router;
