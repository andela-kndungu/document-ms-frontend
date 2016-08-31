import nock from 'nock';
import { should } from 'chai';
import { fetchTags } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

should();

describe('Actions :: fetchTags', () => {
  it('Fetches tags from the server and returns action', (done) => {
    nock('http://localhost:8181', {
      reqheaders: {
        'x-access-token': 'token'
      }
    })
      .get('/api/tags')
      .reply(200, [{}, {}, {}]);

    fetchTags('token', (action) => {
      (action.type).should.eql(constants.FETCHED_TAGS);
      (action.payload).should.be.an.Array;
      done();
    });
  });
});

