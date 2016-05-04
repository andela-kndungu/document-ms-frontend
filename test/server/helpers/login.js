(function() {
  'use strict';

  var app = require('../../../app');
  var request = require('supertest');

  module.exports = {
    admin: function(callback) {
      request(app)
        .post('/users/login')
        .send({
          username: 'admin',
          password: 'adminPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          if (error) {
            callback(error);
          } else {
            callback(null, res);
          }
        });
    },
    user: function(callback) {
      request(app)
        .post('/users/login')
        .send({
          username: 'user',
          password: 'userPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          if (error) {
            callback(error);
          } else {
            callback(null, res);
          }
        });
    },
  };
})();
