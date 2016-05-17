(function() {
  'use strict';

  var app = require('../../app');
  var should = require('should');
  var request = require('supertest');
  var loginHelper = require('./helpers/login');
  var seeder = require('./helpers/seeder');
  var adminToken;
  describe('Tags', function() {
    before(function(done) {
      seeder(function(error) {
        if (error) {
          throw(error);
        } else {
          loginHelper.admin(function(error, res) {
            if (error) {
              throw error;
            } else {
              adminToken = res.body.token;
            }
            done();
          });
        }
      });
    });
    describe('Returns all tags', function() {
      it('responds with an array of all tags', function(done) {
        request(app)
          .get('/tags')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.body.entry).should.be.an.Array;
            should(res.body.entry.length).be.exactly(2);
            done();
          });
      });
    });
    describe('Creates a new tag', function() {
      it('successfully creates a new tag', function(done) {
        request(app)
          .post('/tags')
          .set('x-access-token', adminToken)
          .send({
            title: 'chores'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            (res.body.message).should.containEql('Tag created successfully');
            done();
          });
      });
    });
  });
})();
