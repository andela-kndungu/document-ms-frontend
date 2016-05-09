(function() {
  'use strict';

  var router = require('express').Router();
  var CategoriesController = require('../../controllers/categories');

  // e.g. GET localhost:8080/categories
  router.get('/', CategoriesController.getAll);

  // e.g. POST localhost:8080/categories
  router.post('/', CategoriesController.addCategory);

  // e.g. GET localhost:8080/categories/13
  router.get('/:id', CategoriesController.getCategory);

  // e.g. PUT localhost:8080/documents/13
  router.put('/:id', CategoriesController.updateCategory);

  // e.g. DELETE localhost:8080/documents/13
  router.delete('/:id', CategoriesController.deleteCategory);

  module.exports = router;
})();
