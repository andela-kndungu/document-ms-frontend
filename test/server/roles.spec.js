(function() {
  'use strict';

  var app = require('../../server/index.js'),
    should = require('should'),
    request = require('supertest'),
    loginHelper = require('./helpers/login'),
    seeder = require('./helpers/seeder'),
    Roles = require('../../server/models/roles'),
    adminToken, roleId, userToken;
  describe('Roles', function() {
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
            Roles.find({}, function(error, roles) {
              if (error) {
                throw error;
              }

              roleId = roles[0]._id;
              done();
            });
          });
        });
      });
    });

    describe('Returns all roles', function() {
      it('responds with an array of all roles', function(done) {
        request(app)
          .get('/roles/')
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

    describe('Returns role by ID', function() {
      it('responds with requested object', function(done) {
        request(app)
          .get('/roles/' + roleId)
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
          .get('/roles/' + 'nonValidId')
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
          .get('/roles/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Role does not exist');
            done();
          });
      });
    });

    describe('Updates a role', function() {
      it('updates specified object', function(done) {
        request(app)
          .put('/roles/' + roleId)
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
          .put('/roles/' + 'nonValidId')
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
          .put('/roles/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Role does not exist');
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

      it('returns an error when title is not provided', function(done) {
        request(app)
          .post('/roles')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            (res.body.message).should.containEql('role title must be provided');
            done();
          });
      });
    });

    describe('Deletes a role', function() {
      it('successfully deletes a role', function(done) {
        request(app)
          .delete('/roles/' + roleId)
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Object;
            (res.body._id).should.containEql(roleId);
            done();
          });
      });

      it('returns fail message for non existent role', function(done) {
        request(app)
          .delete('/roles/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Role does not exist')
            done();
          });
      });

      it('responds with a server error on invalid role ID', function(done) {
        request(app)
          .delete('/roles/' + 'nonValidId')
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
          .delete('/roles/' + roleId)
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
