import should from 'should';
import request from 'supertest';
import app from '../../server';
import loginHelper from './helpers/login';
import seeder from './helpers/seeder';
import Tags from '../../server/models/tags';

let adminToken;
let tagId;
let userToken;

describe('Tags', () => {
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
          Tags.find({}, (error, tags) => {
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

  describe('Returns all tags', () => {
    it('responds with an array of all tags', (done) => {
      request(app)
        .get('/api/tags/')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(200);
          should(res.body.length).be.exactly(2);
          done();
        });
    });
  });

  describe('Returns tag by ID', () => {
    it('responds with requested object', (done) => {
      request(app)
        .get(`/api/tags/${tagId}`)
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
        .get('/api/tags/nonValidId')
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
        .get('/api/tags/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Tag does not exist');
          done();
        });
    });
  });

  describe('Updates a tag', () => {
    it('updates specified object', (done) => {
      request(app)
        .put(`/api/tags/${tagId}`)
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
        .put('/api/tags/nonValidId')
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
        .put('/api/tags/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Tag does not exist');
          done();
        });
    });
  });

  describe('Creates a new tag', () => {
    it('successfully creates a new tag', (done) => {
      request(app)
        .post('/api/tags')
        .set('x-access-token', adminToken)
        .send({
          title: 'entertainment'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(200);
          (res.body).should.be.an.Object;
          (res.body.title).should.containEql('entertainment');
          done();
        });
    });

    it('returns an error when title is not provided', (done) => {
      request(app)
        .post('/api/tags')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          (res.body.message).should.containEql('tag title must be provided');
          done();
        });
    });
  });

  describe('Deletes a tag', () => {
    it('successfully deletes a tag', (done) => {
      request(app)
        .delete(`/api/tags/${tagId}`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(200);
          (res.body).should.be.an.Object;
          (res.body._id).should.containEql(tagId);
          done();
        });
    });

    it('returns fail message for non existent tag', (done) => {
      request(app)
        .delete('/api/tags/573b7edafe90559c354b81fd')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(404);
          (res.body.success).should.equal(false);
          (res.body.message).should.containEql('Tag does not exist');
          done();
        });
    });

    it('responds with a server error on invalid role ID', (done) => {
      request(app)
        .delete('/api/tags/nonValidId')
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
        .delete(`/api/tags/${tagId}`)
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

