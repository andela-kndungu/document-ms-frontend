import nock from 'nock';
import { should } from 'chai';
import { fetchPublicDocuments } from '../../../../app/redux/actions';
import constants from '../../../../app/redux/constants';

should();

describe('Actions :: fetchPublicDocuments', () => {
  it('Fetches public documents from the server and returns action', (done) => {
    nock('http://localhost:8181')
      .get('/api/documents/public')
      .reply(200, [{}, {}, {}]);

    fetchPublicDocuments((action) => {
      (action.type).should.eql(constants.FETCHED_PUBLIC_DOCUMENTS);
      (action.payload).should.be.an.Array;
      done();
    });
  });
});
