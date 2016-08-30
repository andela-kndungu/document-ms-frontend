import should from 'should';
import request from 'supertest';
import app from '../../server';
import loginHelper from './helpers/login';
import seeder from './helpers/seeder';
import Users from '../../server/models/users';

let adminToken;
let adminId;
let userToken;
let userId;

describe('Users', () => {
  before((done) => {
    seeder((error) => {
      if (error) {
        throw (error);
      } else {
        loginHelper.admin((error, res) => {
          if (error) {
            throw error;
          } else {
            adminToken = res.body.token;
            adminId = res.body._id;
            loginHelper.user((error, res) => {
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
  it('Does something', () => {
    (4).should.equal(4);
  });

  describe('Returns a user based on ID (GET api/users/:id)', () => {
    it('returns expected user', (done) => {
      request(app)
        .get(`/api/users/${userId}`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body.username).should.equal('user');
          done();
        });
    });

    it('responds with a server error on invalid object ID', (done) => {
      request(app)
        .get('/api/users/nonValidId')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(500);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('reading from the database');
          done();
        });
    });

    it('responds with a fail message on non existent user', (done) => {
      request(app)
        .get('/api/users/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('User does not exist');
          done();
        });
    });
  });

  describe('Updates a user (PUT api/users/:id)', () => {
    it('updates user details and returns new details', (done) => {
      request(app)
        .put(`/api/users/${userId}`)
        .send({
          email: 'anew@email.com',
          username: 'anewuser',
          firstName: 'NewName',
          lastName: 'User',
        })
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(200);
          (res.body.username).should.containEql('anewuser');
          (res.body.name.first).should.containEql('NewName');
          done();
        });
    });

    it('does not update non existent user', (done) => {
      request(app)
        .put('/api/users/573b7edafe90559c354b81fd')
        .send({
          email: 'anew@email.com',
          username: 'anewuser',
          firstName: 'NewName',
          lastName: 'User',
        })
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('User does not exist');
          done();
        });
    });

    it('responds with a server error on invalid object ID', (done) => {
      request(app)
        .put('/api/users/invalidObjectId')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(500);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('reading from the database');
          done();
        });
    });
  });

  describe('Creates a new user (POST api/users/)', () => {
    it('successfully creates a new user', (done) => {
      request(app)
        .post('/api/users')
        .send({
          email: 'new@user.com',
          username: 'newuser',
          firstName: 'New',
          lastName: 'User',
          password: 'newPass',
          role: 'user'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body.email).should.containEql('new@user.com');
          done();
        });
    });

    it('requires an email to be provided', (done) => {
      request(app)
        .post('/api/users')
        .send({
          username: 'uniquename',
          firstName: 'Unique',
          lastName: 'Name',
          password: 'uniquePass',
          role: 'user'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(400);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('email must be provided');
          done();
        });
    });

    it('requires a unique username', (done) => {
      request(app)
        .post('/api/users')
        .send({
          email: 'unique@email.com',
          username: 'newuser',
          firstName: 'Unique',
          lastName: 'Name',
          password: 'uniquePass',
          role: 'user'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(409);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Duplicate key error');
          done();
        });
    });

    it('requires first name to be provided', (done) => {
      request(app)
        .post('/api/users')
        .send({
          email: 'unique@email.com',
          username: 'uniquename',
          lastName: 'Name',
          password: 'uniquePass',
          role: 'user'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(400);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('first name must be provided');
          done();
        });
    });

    it('requires last name to be provided', (done) => {
      request(app)
        .post('/api/users')
        .send({
          email: 'unique@email.com',
          username: 'uniquename',
          firstName: 'Unique',
          password: 'uniquePass',
          role: 'user'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(400);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('last name must be provided');
          done();
        });
    });

    it('created user has a role defined', (done) => {
      request(app)
        .post('/api/users')
        .send({
          email: 'unique@email.com',
          username: 'uniquename',
          firstName: 'Unique',
          lastName: 'Name',
          password: 'uniquePass',
          role: 'user'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          should.exist((res.body.roles[0]));
          done();
        });
    });
  });

  describe('All user\'s documents (GET /api/users/:id/documents)', () => {
    it('responds with an array of all the user\'s documents', (done) => {
      request(app)
        .get(`/api/users/${adminId}/documents`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          should(res.body.length).be.greaterThan(0);
          (res.body[0].owner).should.equal(adminId);
          done();
        });
    });

    it('responds with an empty array for non existent user', (done) => {
      request(app)
        .get('/api/users/57c5bc6d88347dee0bc7c43b/documents')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(200);
          (res.body.length).should.equal(0);
          done();
        });
    });
  });

  describe('Logs in a user (POST /api/users/login)', () => {
    it('logs in user and returns expected user details', (done) => {
      request(app)
        .post('/api/users/login/')
        .send({
          username: 'admin',
          password: 'adminPassword'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          should.exist(res.body.token);
          (res.body.username).should.equal('admin');
          done();
        });
    });

    it('returns error message when given non existent user', (done) => {
      request(app)
        .post('/api/users/login/')
        .send({
          username: 'newuser12',
          password: 'newPass'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(401);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('User does not exist');
          done();
        });
    });

    it('returns error message when given wrong password', (done) => {
      request(app)
        .post('/api/users/login/')
        .send({
          username: 'admin',
          password: 'wrongPass'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(401);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Incorrect password.');
          done();
        });
    });
  });

  describe('Deletes a user (DELETE api/users/:id)', () => {
    it('deletes a user', (done) => {
      request(app)
        .delete(`/api/users/${userId}`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(200);
          (res.body._id).should.containEql(userId);
          done();
        });
    });

    it('responds with a server error on invalid object ID', (done) => {
      request(app)
        .delete('/api/users/invalidObjectId')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(500);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('reading from the database');
          done();
        });
    });

    it('responds with a fail message on non existent user', (done) => {
      request(app)
        .delete('/api/users/57c5bc6d88347dee0bc7c43b')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('User does not exist');
          done();
        });
    });
  });

  describe('Returns all users (GET api/users/)', () => {
    it('responds with an array of all users', (done) => {
      request(app)
        .get('/api/users')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          (res.status).should.equal(200);
          should.not.exist(error);
          should(res.body.length).be.above(2);
          done();
        });
    });

    it('returns error when invalid token is provided', (done) => {
      request(app)
        .get('/api/users')
        .set('x-access-token', `${adminToken}toCorruptToken`)
        .set('Accept', 'application/json')
        .end((error, res) => {
          (res.status).should.equal(401);
          should.not.exist(error);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Failed to authenticate');
          should.not.exist(res.body.entry);
          done();
        });
    });

    it('returns error when no token is provided', (done) => {
      request(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .end((error, res) => {
          (res.status).should.equal(401);
          should.not.exist(error);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('No token provided');
          done();
        });
    });

    it('returns empty array when there are no users', (done) => {
      // Delete all users
      Users.remove({}, (error) => {
        if (!error) {
          request(app)
            .get('/api/users')
            .set('x-access-token', adminToken)
            .set('Accept', 'application/json')
            .end((error, res) => {
              (res.status).should.equal(200);
              should.not.exist(error);
              (res.body.length).should.equal(0);
              done();
            });
        }
      });
    });
  });
});

