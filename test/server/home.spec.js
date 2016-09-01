import should from 'should'; // eslint-disable-line
import request from 'supertest';
import app from '../../server/index.js';

describe('Home', () => {
  describe('Returns expected objected for home route', () => {
    it('responds with html text', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .end((error, res) => {
          res.status.should.equal(200);
          (res.text).should.be.ok;
          done();
        });
    });
  });
});
