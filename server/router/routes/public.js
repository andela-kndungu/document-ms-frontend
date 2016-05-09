(function() {
  'use strict';

  var router = require('express').Router();
  var UsersController = require('../../controllers/users');

  /* GET home page. */
  router.get('/', function(req, res) {
    res.json({
      success: true,
      message: 'Api active'
    });
  });

  // e.g. POST localhost:8080/users/login
  router.post('/users/login', UsersController.login);

  // e.g. POST localhost:8080/users
  router.post('/users', UsersController.addUser);

  module.exports = router;
})();
