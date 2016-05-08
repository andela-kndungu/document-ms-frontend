(function() {
  'use strict';

  var app = require('../../app');
  var should = require('should');
  var request = require('supertest');
  var loginHelper = require('./helpers/login');
  var seeder = require('./helpers/seeder');
  var adminToken, adminId;
  describe('Search', function() {
    before(function(done) {
      seeder(function(error) {
        if (error) {
          throw (error);
        } else {
          loginHelper.admin(function(error, res) {
            if (error) {
              throw error;
            } else {
              adminToken = res.body.token;
              adminId = res.body.entry._id;
              done();
            }
          });
        }
      });
    });
    describe('Search by role', function() {
      it('returns all doucments accessible by the admin', function(done) {
        request(app)
          .get('/search?role=admin')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.body.should.be.an.Array;
            should(res.body.length).be.exactly(200);
            done();
          });
      });
      it('returns all doucments accessible by the user', function(done) {
        request(app)
          .get('/search?role=user')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.body.should.be.an.Array;
            should(res.body.length).be.lessThan(200);
            done();
          });
      });
      it('admin\'s returned doucments are sorted by date', function(done) {
        request(app)
          .get('/search?role=admin')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var currentDocument = new Date(res.body[i].created);
              var nextDocument = new Date(res.body[i + 1].created);
              // It was created after the next documcent in the array
              (currentDocument - nextDocument).should.not.be.lessThan(0);
            }
            done();
          });
      });
      it('user\'s returned doucments are sorted by date', function(done) {
        request(app)
          .get('/search?role=user')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var currentDocument = new Date(res.body[i].created);
              var nextDocument = new Date(res.body[i + 1].created);
              // It was created after the next documcent in the array
              (currentDocument - nextDocument).should.not.be.lessThan(0);
            }
            done();
          });
      });
    });
  });
})();
