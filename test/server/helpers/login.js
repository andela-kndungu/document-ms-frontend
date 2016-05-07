(function() {
  'use strict';

  var app = require('../../../app');
  var request = require('supertest');

  module.exports = {
    admin: function(callback) {
      request(app)
        .post('/users/login')
        .send({
          username: 'first',
          password: 'firstPassword'
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
          username: 'second',
          password: 'secondPassword'
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
