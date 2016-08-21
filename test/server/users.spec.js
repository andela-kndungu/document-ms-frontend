(function() {
  'use strict';

  var app = require('../../server');
  var should = require('should');
  var request = require('supertest');
  var loginHelper = require('./helpers/login');
  var seeder = require('./helpers/seeder');
  var Users = require('../../server/models/users');
  var adminToken, adminId, userToken, userId;

  describe('Users', function() {
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
              adminId = res.body._id;
              loginHelper.user(function(error, res) {
                if (error) {
                  throw error;
                } else {
                  userToken = res.body.token;
                  userId = res.body._id;
                }
                done();
              });
            }
          });
        }
      });
    });

    describe('Returns a user based on ID (GET /users/<id>)', function() {
      it('returns expected user', function(done) {
        request(app)
          .get('/users/' + userId)
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body.username).should.equal('user');
            done();
          });
      });

      it('responds with a server error on invalid object ID', function(done) {
        request(app)
          .get('/users/' + 'nonValidId')
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

      it('responds with a fail message on non existent user', function(done) {
        request(app)
          .get('/users/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('User does not exist');
            done();
          });
      });
    });

    describe('Updates a user (PUT /users/:id)', function() {
      it('updates user details and returns new details', function(done) {
        request(app)
          .put('/users/' + userId)
          .send({
            email: 'anew@email.com',
            username: 'anewuser',
            firstName: 'NewName',
            lastName: 'User',
          })
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            (res.body.username).should.containEql('anewuser');
            (res.body.name.first).should.containEql('NewName');
            done();
          });
      });

      it('does not update non existent user', function(done) {
        request(app)
          .put('/users/' + '573b7edafe90559c354b81fd')
          .send({
            email: 'anew@email.com',
            username: 'anewuser',
            firstName: 'NewName',
            lastName: 'User',
          })
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('User does not exist');
            done();
          });
      });

      it('responds with a server error on invalid object ID', function(done) {
        request(app)
          .put('/users/' + 'nonValidId')
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
    });

    describe('Creates a new user (POST /users/)', function() {
      it('successfully creates a new user', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'new@user.com',
            username: 'newuser',
            firstName: 'New',
            lastName: 'User',
            password: 'newPass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body.email).should.containEql('new@user.com');
            done();
          });
      });

      it('requires an email to be provided', function(done) {
        request(app)
          .post('/users')
          .send({
            username: 'uniquename',
            firstName: 'Unique',
            lastName: 'Name',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(400);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('email must be provided');
            done();
          });
      });

      it('requires a username to be provided', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'unique@email.com',
            firstName: 'Unique',
            lastName: 'Name',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(400);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('username must be provided');
            done();
          });
      });

      it('requires a unique email', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'new@user.com',
            username: 'uniquename',
            firstName: 'Unique',
            lastName: 'Name',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(409);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Duplicate key error');
            done();
          });
      });

      it('requires a unique username', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'unique@email.com',
            username: 'newuser',
            firstName: 'Unique',
            lastName: 'Name',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(409);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Duplicate key error');
            done();
          });
      });

      it('requires first name to be provided', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'unique@email.com',
            username: 'uniquename',
            lastName: 'Name',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(400);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('first name must be provided');
            done();
          });
      });

      it('requires last name to be provided', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'unique@email.com',
            username: 'uniquename',
            firstName: 'Unique',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(400);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('last name must be provided');
            done();
          });
      });

      it('created user has a role defined', function(done) {
        request(app)
          .post('/users')
          .send({
            email: 'unique@email.com',
            username: 'uniquename',
            firstName: 'Unique',
            lastName: 'Name',
            password: 'uniquePass',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            should.exist((res.body.roles[0]));
            done();
          });
      });
    });

    describe('All user\'s documents (GET /users/<id>/documents)', function() {
      it('responds with an array of all the user\'s documents', function(done) {
        request(app)
          .get('/users/' + adminId + '/documents')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            (res.body).should.be.an.Array;
            should(res.body.length).be.greaterThan(0);
            (res.body[0].ownerId).should.equal(adminId);
            done();
          });
      });

      it('responds with an empty array for non existent user', function(done) {
        request(app)
          .get('/users/' + '123' + '/documents')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            (res.body).should.be.an.Array;
            (res.body.length).should.equal(0);
            done();
          });
      });
    });

    describe('Logs in a user (POST /users/login)', function() {
      it('logs in user and returns expected user details', function(done) {
        request(app)
          .post('/users/login/')
          .send({
            username: 'newuser',
            password: 'newPass'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            should.exist(res.body.token);
            (res.body.username).should.equal('newuser');
            done();
          });
      });

      it('returns error message when given non existent user', function(done) {
        request(app)
          .post('/users/login/')
          .send({
            username: 'newuser12',
            password: 'newPass'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('User does not exist');
            done();
          });
      });

      it('returns error message when given wrong password', function(done) {
        request(app)
          .post('/users/login/')
          .send({
            username: 'newuser',
            password: 'wrongPass'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(401);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('failed. Wrong password.');
            done();
          });
      });
    });

    describe('Deletes a user (DELETE /users/:id)', function() {
      it('deletes a user', function(done) {
        request(app)
          .delete('/users/' + userId)
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            (res.status).should.equal(200);
            (res.body).should.be.an.Object;
            (res.body._id).should.containEql(userId);
            done();
          });
      });

      it('responds with a server error on invalid object ID', function(done) {
        request(app)
          .delete('/users/' + 'nonValidId')
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

      it('responds with a fail message on non existent user', function(done) {
        request(app)
          .delete('/users/' + '573b7edafe90559c354b81fd')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(404);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('User does not exist');
            done();
          });
      });
    });

    describe('Returns all users (GET /users/)', function() {
      it('responds with an array of all users', function(done) {
        request(app)
          .get('/users')
          .set('x-access-token', adminToken)
          .set('Accept', 'application/json')
          .end(function(error, res) {
            (res.status).should.equal(200);
            should.not.exist(error);
            (res.body).should.be.an.Array;
            should(res.body.length).be.exactly(4);
            done();
          });
      });

      it('returns error when invalid token is provided', function(done) {
        request(app)
          .get('/users')
          .set('x-access-token', adminToken + 'toCorruptToken')
          .set('Accept', 'application/json')
          .end(function(error, res) {
            (res.status).should.equal(401);
            should.not.exist(error);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('Failed to authenticate');
            should.not.exist(res.body.entry);
            done();
          });
      });

      it('returns error when no token is provided', function(done) {
        request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .end(function(error, res) {
            (res.status).should.equal(401);
            should.not.exist(error);
            (res.body.success).should.equal(false);
            (res.body.message).should.containEql('No token provided');
            done();
          });
      });

      it('returns empty array when there are no users', function(done) {
        // Delete all users
        Users.remove({}, function(error) {
          if (!error) {
            request(app)
              .get('/users')
              .set('x-access-token', adminToken)
              .set('Accept', 'application/json')
              .end(function(error, res) {
                (res.status).should.equal(200);
                should.not.exist(error);
                (res.body).should.be.an.Array;
                (res.body.length).should.equal(0);
                done();
              });
          }
        });
      });
    });
  });
})();
