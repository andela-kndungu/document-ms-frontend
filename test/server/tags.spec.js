(function() {
  'use strict';

  var app = require('../../server'),
    should = require('should'),
    request = require('supertest'),
    loginHelper = require('./helpers/login'),
    seeder = require('./helpers/seeder'),
    Tags = require('../../server/models/tags'),
    adminToken, tagId, userToken;

  describe('Tags', function() {
    before(function(done) {
      seeder(function(error) {
        if (error) {
          throw error;
        }

        loginHelper.admin(function(error, res) {
          if (error) {
            throw error;
          }

          adminToken = res.body.token;
          loginHelper.user(function(error, res) {
            if (error) {
              throw error;
            }

            userToken = res.body.token;
            Tags.find({}, function(error, tags) {
              if (error) {
                throw error;
              }

              tagId = tags[0]._id;
              done();
            });
          });
        });
      });
    });

    describe('Returns all tags', function() {
      it('responds with an array of all tags', function(done) {
        request(app)
          .get('/tags/')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Array;
            should(res.body.length).be.exactly(2);
            done();
          });
      });
    });

    describe('Returns tag by ID', function() {
      it('responds with requested object', function(done) {
        request(app)
          .get('/tags/' + tagId)
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Object;
            done();
          });
      });

      it('responds with a server error on invalid object ID', function(done) {
        request(app)
          .get('/tags/' + 'nonValidId')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(500);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('reading from the database');
            done();
          });
      });

      it('responds with a fail message on non existent ID', function(done) {
        request(app)
          .get('/tags/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Tag does not exist');
            done();
          });
      });
    });

    describe('Updates a tag', function() {
      it('updates specified object', function(done) {
        request(app)
          .put('/tags/' + tagId)
          .send({
            title: 'updated'
          })
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Object;
            (res.body.title).should.containEql('updated');
            done();
          });
      });

      it('responds with a server error on invalid role ID', function(done) {
        request(app)
          .put('/tags/' + 'nonValidId')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(500);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('reading from the database');
            done();
          });
      });

      it('responds with a fail message on non existent ID', function(done) {
        request(app)
          .put('/tags/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Tag does not exist');
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
            title: 'entertainment'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            (res.body).should.be.an.Object;
            (res.body.title).should.containEql('entertainment');
            done();
          });
      });

      it('returns an error when title is not provided', function(done) {
        request(app)
          .post('/tags')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            (res.body.message).should.containEql('tag title must be provided');
            done();
          });
      });
    });

    describe('Deletes a tag', function() {
      it('successfully deletes a tag', function(done) {
        request(app)
          .delete('/tags/' + tagId)
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            (res.body).should.be.an.Object;
            (res.body._id).should.containEql(tagId);
            done();
          });
      });

      it('returns fail message for non existent tag', function(done) {
        request(app)
          .delete('/tags/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Tag does not exist')
            done();
          });
      });

      it('responds with a server error on invalid role ID', function(done) {
        request(app)
          .delete('/tags/' + 'nonValidId')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(500);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('reading from the database');
            done();
          });
      });

      it('only an admin can delete a role', function(done) {
        request(app)
          .delete('/tags/' + tagId)
          .set('x-access-token', userToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(403);
            res.body.success.should.equal(false);
            (res.body.message).should.containEql('Not authorised to delete');
            done();
          });
      });
    });
  });
})();
