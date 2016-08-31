import nock from 'nock';
import { should } from 'chai';
import { fetchDocuments } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

should();

describe('Actions :: fetchDocuments', () => {
  it('Fetches documents from the server and returns action', (done) => {
    nock('http://localhost:8181', {
      reqheaders: {
        'x-access-token': 'token'
      }
    })
      .get('/api/documents')
      .reply(200, [{}, {}, {}]);

    fetchDocuments('token', {}, (action) => {
      (action.type).should.eql(constants.FETCHED_DOCUMENTS);
      (action.payload).should.be.an.Array;
      done();
    });
  });
});
