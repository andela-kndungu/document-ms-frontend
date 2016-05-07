(function() {
  'use strict';

  var app = require('../../app');
  var should = require('should');
  var request = require('supertest');
  var loginHelper = require('./helpers/login');
  var seeder = require('./helpers/seeder');
  var adminToken, adminId, userToken, userId;
  describe('Roles', function() {
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
              adminId = res.body.entry._id;
              loginHelper.user(function(error, res) {
                if (error) {
                  throw error;
                } else {
                  userToken = res.body.token;
                  userId = res.body.entry._id;
                }
                done();
              });
            }
          });
        }
      });
    });
    describe('Created document has a date', function() {
      it('document created by admin has a date defined', function(done) {
        request(app)
          .post('/documents')
          .set('x-access-token', adminToken)
          .send({
            title: 'Admin test document',
            content: 'I am an admin testing out the date field',
            owner_id: adminId,
            category: 'business'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // Date arithmetic
            var now = new Date().getTime();
            var created = new Date(res.body.entry.created);
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body.success).should.equal(true);
            should.exist(created);
            (now - created).should.be.greaterThan(0);
            done();
          });
      });
      it('document created by user has a date defined', function(done) {
        request(app)
          .post('/documents')
          .set('x-access-token', userToken)
          .send({
            title: 'Admin test document',
            content: 'I am an admin testing out the date field',
            owner_id: adminId,
            category: 'business'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // Date arithmetic
            var now = new Date().getTime();
            var created = new Date(res.body.entry.created);
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body.success).should.equal(true);
            should.exist(created);
            (now - created).should.be.greaterThan(0);
            done();
          });
      });
    });
    describe('Creates a new role', function() {
      it('successfully creates a new role', function(done) {
        request(app)
          .post('/roles')
          .set('x-access-token', adminToken)
          .send({
            title: 'viewer'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            (res.body.message).should.containEql('Role created successfully');
            done();
          });
      });
    });
  });
})();
