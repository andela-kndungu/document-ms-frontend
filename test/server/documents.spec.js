(function() {
  'use strict';

  var app = require('../../app');
  var should = require('should');
  var request = require('supertest');
  var loginHelper = require('./helpers/login');
  var seeder = require('./helpers/seeder');
  var adminToken, adminId, userToken, userId;
  describe('Documents', function() {
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
            category: 'business',
            access_rights: 'private'
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
            category: 'business',
            access_rights: 'public'
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
    describe('Returned documents are sorted by date', function() {
      it('sorts all the documents in descending order by date', function(done) {
        request(app)
          .get('/documents')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var documentCreated = new Date(res.body[i].created);
              var nextDocumentCreated = new Date(res.body[i + 1].created);
              // It was created after the next documcent in the array
              (documentCreated - nextDocumentCreated).should.not.be.lessThan(0);
            }
            done();
          });
      });
      it('sorts paginated in descending order by date', function(done) {
        request(app)
          .get('/documents?limit=10&page=5')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var documentCreated = new Date(res.body[i].created);
              var nextDocumentCreated = new Date(res.body[i + 1].created);
              // It was created after the next documcent in the array
              (documentCreated - nextDocumentCreated).should.not.be.lessThan(0);
            }
            done();
          });
      });
      it('sorts limited in descending order by date', function(done) {
        request(app)
          .get('/documents?limit=10')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            // For every document in the response
            for (var i = 0; i < (res.body.length) - 1; i++) {
              var documentCreated = new Date(res.body[i].created);
              var nextDocumentCreated = new Date(res.body[i + 1].created);
              // It was created after the next documcent in the array
              (documentCreated - nextDocumentCreated).should.not.be.lessThan(0);
            }
            done();
          });
      });
    });
  });
})();
