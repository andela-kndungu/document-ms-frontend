import should from 'should';
import request from 'supertest';
import app from '../../server/index.js';
import loginHelper from './helpers/login';
import seeder from './helpers/seeder';
import Roles from '../../server/models/roles';

let adminToken;
let roleId;
let userToken;
describe('Roles', () => {
  before((done) => {
    seeder((error) => {
      if (error) {
        throw error;
      }

      loginHelper.admin((error, res) => {
        if (error) {
          throw error;
        }

        adminToken = res.body.token;
        loginHelper.user((error, res) => {
          if (error) {
            throw error;
          }

          userToken = res.body.token;
          Roles.find({}, (error, roles) => {
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

  describe('Returns all roles', () => {
    it('responds with an array of all roles', (done) => {
      request(app)
        .get('/roles/')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body).should.be.an.Array;
          should(res.body.length).be.exactly(2);
          done();
        });
    });
  });

  describe('Returns role by ID', () => {
    it('responds with requested object', (done) => {
      request(app)
        .get(`/roles/${roleId}`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body).should.be.an.Object;
          done();
        });
    });

    it('responds with a server error on invalid object ID', (done) => {
      request(app)
        .get('/roles/nonValidId')
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

    it('responds with a fail message on non existent ID', (done) => {
      request(app)
        .get('/roles/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Role does not exist');
          done();
        });
    });
  });

  describe('Updates a role', () => {
    it('updates specified object', (done) => {
      request(app)
        .put(`/roles/${roleId}`)
        .send({
          title: 'updated'
        })
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body).should.be.an.Object;
          (res.body.title).should.containEql('updated');
          done();
        });
    });

    it('responds with a server error on invalid role ID', (done) => {
      request(app)
        .put('/roles/nonValidId')
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

    it('responds with a fail message on non existent ID', (done) => {
      request(app)
        .put('/roles/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Role does not exist');
          done();
        });
    });
  });

  describe('Creates a new role', () => {
    it('successfully creates a new role', (done) => {
      request(app)
        .post('/roles')
        .set('x-access-token', adminToken)
        .send({
          title: 'viewer'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          (res.body.message).should.containEql('Role created successfully');
          done();
        });
    });

    it('returns an error when title is not provided', (done) => {
      request(app)
        .post('/roles')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          (res.body.message).should.containEql('role title must be provided');
          done();
        });
    });
  });

  describe('Deletes a role', () => {
    it('successfully deletes a role', (done) => {
      request(app)
        .delete(`/roles/${roleId}`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          (res.body).should.be.an.Object;
          (res.body._id).should.containEql(roleId);
          done();
        });
    });

    it('returns fail message for non existent role', (done) => {
      request(app)
        .delete('/roles/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Role does not exist');
          done();
        });
    });

    it('responds with a server error on invalid role ID', (done) => {
      request(app)
        .delete('/roles/nonValidId')
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

    it('only an admin can delete a role', (done) => {
      request(app)
        .delete(`/roles/${roleId}`)
        .set('x-access-token', userToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(403);
          res.body.success.should.equal(false);
          (res.body.message).should.containEql('Not authorised to delete');
          done();
        });
    });
  });
});

