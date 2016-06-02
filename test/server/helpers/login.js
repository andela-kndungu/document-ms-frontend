(function() {
  'use strict';

  var app = require('../../../app'),
    request = require('supertest');

  module.exports = {
    admin: function(callback) {
      request(app)
        .post('/users/login')
        .send({
          username: 'admin',
          password: 'adminPassword'
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
          password: 'userPassword'
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

    unauthorized: function(callback) {
      request(app)
        .post('/users/login')
        .send({
          username: 'unauthorized',
          password: 'unauthorizedPassword'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          if (error) {
            callback(error);
          } else {
            callback(null, res);
          }
        });
    }
  };
})();
