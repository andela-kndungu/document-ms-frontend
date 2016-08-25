(function() {
  'use strict';

  var app = require('../../server/index.js'),
    should = require('should'),
    request = require('supertest');

  describe('Home', function() {

    describe('Returns expected objected for home route', function() {
      it('responds with an array of all roles', function(done) {
        request(app)
          .get('/')
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            done();
          });
      });
    });
  });
})();
