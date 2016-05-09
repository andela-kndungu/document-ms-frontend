(function() {
  'use strict';

  var router = require('express').Router();
  var RolesController = require('../../controllers/roles');

  // e.g. GET localhost:8080/roles
  router.get('/', RolesController.getAll);

  // e.g. POST localhost:8080/roles
  router.post('/', RolesController.addRole);

  // e.g. GET localhost:8080/roles/13
  router.get('/:id', RolesController.getRole);

  // e.g. PUT localhost:8080/documents/13
  router.put('/:id', RolesController.updateRole);

  // e.g. DELETE localhost:8080/documents/13
  router.delete('/:id', RolesController.deleteRole);

  module.exports = router;
})();
