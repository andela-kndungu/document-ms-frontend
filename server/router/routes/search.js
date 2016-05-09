(function() {
  'use strict';

  var router = require('express').Router();
  var SearchController = require('../../controllers/search');

  // e.g. GET localhost:8080/search
  router.get('/', SearchController.getAll);

  module.exports = router;
})();
