var router = require('express').Router();
var RolesController = require('../../controllers/users');

// e.g. GET localhost:8080/roles
router.get('/', RolesController.getAll);

// // e.g. POST localhost:8080/users/13
// router.get('/:id', RolesController.getById);

module.exports = router;
