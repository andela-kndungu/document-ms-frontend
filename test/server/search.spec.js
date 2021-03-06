import should from 'should';
import request from 'supertest';
import app from '../../server';
import loginHelper from './helpers/login';
import seeder from './helpers/seeder';

let adminToken;
let userToken;

describe('Search', () => {
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
            loginHelper.user((error, res) => {
              if (error) {
                throw error;
              } else {
                userToken = res.body.token;
                done();
              }
            });
          }
        });
      }
    });
  });

  describe('Search by role', () => {
    it('returns all doucments accessible by the admin', (done) => {
      request(app)
        .get('/api/documents?role=admin')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.status).should.equal(200);
          (res.body).should.be.an.Array;
          should(res.body.length).be.greaterThan(0);
          done();
        });
    });

    it('returns all doucments accessible by the user', (done) => {
      request(app)
        .get('/api/documents?role=user')
        .set('x-access-token', userToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should.not.exist(error);
          (res.body).should.be.an.Array;
          should(res.body.length).be.greaterThan(0);
          done();
        });
    });
    it('admin\'s returned doucments are sorted by date', (done) => {
      request(app)
        .get('/api/documents?role=admin')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          // For every document in the response
          for (let i = 0; i < (res.body.length) - 1; i++) {
            const currentDocument = new Date(res.body[i].created);
            const nextDocument = new Date(res.body[i + 1].created);
            // It was created after the next documcent in the array
            (currentDocument - nextDocument).should.not.be.lessThan(0);
          }
          done();
        });
    });
    it('user\'s returned doucments are sorted by date', (done) => {
      request(app)
        .get('/api/documents?role=user')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          // For every document in the response
          for (let i = 0; i < (res.body.length) - 1; i++) {
            const currentDocument = new Date(res.body[i].created_at);
            const nextDocument = new Date(res.body[i + 1].created_at);
            // It was created after the next documcent in the array
            (currentDocument - nextDocument).should.not.be.lessThan(0);
          }
          done();
        });
    });
    it('number of returned doucments can be specified', (done) => {
      request(app)
        .get('/api/documents?role=admin&limit=10')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/json')
        .end((error, res) => {
          should(res.body.length).not.be.greaterThan(10);
          done();
        });
    });
  });

  // describe('search by date', function() {
    // it('returns public documents created on a specific date', function(done) {
      // var today = new Date();
      // var year = today.getUTCFullYear();
      // var month = today.getMonth();
      // var day = today.getDate();
      // var month = today.getMonth();
      // var dateString = year + ', ' + month + ', ' + day;
      // request(app)
        // .get('/documents?date=' + dateString)
        // .set('x-access-token', adminToken)
        // .set('Accept', 'application/json')
        // .end(function(error, res) {
          // res.status.should.equal(200);
          // should(res.body.length).be.greaterThan(0);
          // done();
        // });
    // });
    // it('no documents are returned for an invalid date', function(done) {
      // var today = new Date();
      // var year = today.getFullYear();
      // var month = parseInt(today.getMonth() + 2, 10) < 10 ?
        // '0' + (today.getMonth() + 2) :
        // today.getMonth() + 2;
      // var day = parseInt(today.getDate(), 10) < 10 ?
        // '0' + today.getDate() :
        // today.getDate();
      // var dateString = year + '-' + month + '-' + day;
      // request(app)
        // .get('/documents?date=' + dateString)
        // .set('x-access-token', adminToken)
        // .set('Accept', 'application/json')
        // .end(function(error, res) {
          // res.status.should.equal(200);
          // should(res.body.length).be.exactly(0);
          // done();
        // });
    // });
  // });

  // describe('Search by tag', function() {
    // it('returns all doucments with specified tag', function(done) {
      // request(app)
        // .get('/documents?tag=education')
        // .set('x-access-token', adminToken)
        // .set('Accept', 'application/json')
        // .end(function(error, res) {
          // should.not.exist(error);
          // (res.status).should.equal(200);
          // (res.body).should.be.an.Array;
          // should(res.body.length).be.greaterThan(0);
          // done();
        // });
    // });

    // it('does not return non existent tag', function(done) {
      // request(app)
        // .get('/documents?tag=educations')
        // .set('x-access-token', adminToken)
        // .set('Accept', 'application/json')
        // .end(function(error, res) {
          // should.not.exist(error);
          // (res.status).should.equal(404);
          // (res.body.success).should.equal(false);
          // (res.body.message).should.containEql('Tag does not exist');
          // done();
        // });
    // });
  // });
});

