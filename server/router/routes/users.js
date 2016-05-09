(function() {
  'use strict';

  var router = require('express').Router();
  var UsersController = require('../../controllers/users');
  // var DocumentsController = require('../../controllers/documents');

  // e.g. GET localhost:8080/users
  router.get('/', UsersController.getAll);

  // e.g. GET localhost:8080/users/13/documeents
  router.get('/:id/documents', UsersController.getDocumentsById);

  // e.g. GET localhost:8080/users/13
  router.get('/:id', UsersController.getUser);

  // e.g. PUT localhost:8080/users/13
  router.put('/:id', UsersController.updateUser);

  // e.g. DELETE localhost:8080/users/13
  router.delete('/:id', UsersController.deleteUser);

  module.exports = router;
})();
