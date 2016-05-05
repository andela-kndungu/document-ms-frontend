var router = require('express').Router();
var RolesController = require('../../controllers/roles');

// e.g. GET localhost:8080/roles
router.get('/', RolesController.getAll);

// e.g. POST localhost:8080/roles
router.post('/', RolesController.addRole);

module.exports = router;
