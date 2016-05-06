var router = require('express').Router();
var CategoriesController = require('../../controllers/categories');

// e.g. GET localhost:8080/roles
router.get('/', CategoriesController.getAll);

// e.g. POST localhost:8080/roles
router.post('/', CategoriesController.addRole);

module.exports = router;
