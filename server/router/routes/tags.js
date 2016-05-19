(function() {
  'use strict';

  var router = require('express').Router();
  var TagsController = require('../../controllers/tags');

  // Create a tag (POST localhost:8080/tags)
  router.post('/', TagsController.create);

  // Fetch tag by ID (GET localhost:8080/tags/id)
  router.get('/:id', TagsController.find.id);

  // Fetch all tags (GET localhost:8080/tags)
  router.get('/', TagsController.find.all);

  // Update tag by ID (PUT localhost:8080/cateogries/id)
  router.put('/:id', TagsController.update);

  // Delete tag by id (DELETE localhost:8080/cateogries/id)
  router.delete('/:id', TagsController.destroy);

  module.exports = router;
})();
